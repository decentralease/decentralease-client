import { useState } from "react";

import {
    useAccount,
    useContract,
    useContractWrite,
    useContractRead,
    useSigner,
    useNetwork
} from "wagmi";

import { ethers } from "ethers";

import marketABI from '../abis/market.json';
import doNFTContractABI from '../abis/doNFT.json';
import { getMarket } from "../data/markets";

const useRentModal = (contractAddress : string, tokenId : number) => {

    const { address } = useAccount();
    const { data: signer } = useSigner();
    const { chain } = useNetwork();

    const doNFTContract = useContract({
        addressOrName: contractAddress,
        contractInterface: doNFTContractABI,
        signerOrProvider: signer,
    });

    const { data: lendOrder } = useContractRead({
        addressOrName: getMarket(chain?.id),
        contractInterface: marketABI,
        functionName: 'getLendOrder',
        args: [contractAddress, tokenId]
    })

    const { data: paymentSigma } = useContractRead({
        addressOrName: getMarket(chain?.id),
        contractInterface: marketABI,
        functionName: 'getPaymentSigma',
        args: [contractAddress, tokenId]
    })

    const { write: fulfillOrderNow, isLoading: fulfillLoading, isSuccess: fulfillSuccess } = useContractWrite({
        addressOrName: getMarket(chain?.id),
        contractInterface: marketABI,
        functionName: 'fulfillOrderNow',
        signerOrProvider: signer
    })

    const [duration, setDuration] = useState(0);

    const rent = async () => {
        const durationList = await doNFTContract.getDurationIdList(tokenId);
        await fulfillOrderNow({
            args: [
                contractAddress, 
                tokenId, 
                durationList[0].toNumber(), 
                Math.ceil(duration * 24 * 60 * 60), 
                address,
            ],
            overrides: {
                value: ethers.utils.parseEther((parseFloat(getPrice()) * duration).toString())
            }
        })
    }

    const getPrice = () => {
        if(paymentSigma) {
            for(let i = paymentSigma.infos.length - 1; i >= 0; i--) {
                if((duration * 24 * 60 * 60) > paymentSigma.infos[i].minDuration.toNumber()) {
                    return ethers.utils.formatEther(paymentSigma.infos[i].pricePerDay);
                }
            }
        }
        return "0";
    }

    const rentDetails = (lendOrder && paymentSigma) ? {
        price: getPrice(),
        maxEndTime: lendOrder.maxEndTime.toNumber(), 
    } : {};

    return {
        rentDetails,
        duration,
        setDuration,
        rent,
        fulfillLoading,
        fulfillSuccess,
    }

}

export default useRentModal;