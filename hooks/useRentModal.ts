import { useState } from "react";

import { 
    useContract,
    useContractData,
    useAddress,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const useRentModal = (contractAddress : string, tokenId : number) => {

    const address = useAddress();
    const { contract: marketContract } = useContract(process.env.NEXT_PUBLIC_MARKET_ADDRESS);
    const { contract: doNFTContract } = useContract(contractAddress);
    const { data: lendOrder } = useContractData(
        marketContract,
        "getLendOrder",
        contractAddress,
        tokenId
    );
    const { data: paymentSigma } = useContractData(
        marketContract,
        "getPaymentSigma",
        contractAddress,
        tokenId
    );

    const [duration, setDuration] = useState(0);

    const rent = async () => {
        const durationList = await doNFTContract.call("getDurationIdList", tokenId);
        await marketContract.call(
            "fulfillOrderNow", 
            contractAddress, 
            tokenId, 
            durationList[0].toNumber(), 
            Math.ceil(duration * 24 * 60 * 60), 
            address,
            {
                value: ethers.utils.parseEther((parseFloat(getPrice()) * duration).toString())
            }
        );
    }

    if(paymentSigma){
        console.log(paymentSigma.infos);
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
    }

}

export default useRentModal;