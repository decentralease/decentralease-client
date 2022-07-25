import moment from "moment";
import { ethers } from "ethers";

import { useAccount, useContractWrite, useContract, useSigner, useContractReads, useProvider } from "wagmi";
import useOwnedNFTs from "./useLendOwnedNFTs/useOwnedNFTs";

import doNFTABI from "../abis/doNFT.json";
import marketABI from "../abis/market.json";

const useStakedNFTs = (contractAddress: string) => {

    const { address } = useAccount();
    const provider = useProvider();
    const { data: signer } = useSigner()

    const {
        ownedNFTs: stakedNFTs
    } = useOwnedNFTs(contractAddress);

    const { write: createSigmaHook, isLoading: lendLoading, isSuccess: lendSuccess } = useContractWrite({
        addressOrName: process.env.NEXT_PUBLIC_MARKET_ADDRESS,
        contractInterface: marketABI,
        functionName: 'createSigma',
    })

    const doNFTContract = useContract({
        addressOrName: contractAddress,
        contractInterface: doNFTABI,
        signerOrProvider: provider
    })

    const { write: redeem } = useContractWrite({
        addressOrName: contractAddress,
        contractInterface: doNFTABI,
        functionName: 'redeem',
        signerOrProvider: signer
    })

    const { data: areVNFTs, isLoading } = useContractReads({
        contracts: stakedNFTs.map(({ tokenId }) => ({
            addressOrName: contractAddress,
            contractInterface: doNFTABI,
            functionName: 'isVNft',
            args: [tokenId]
        }))
    })

    const createSigma = async (
        tokenId: number,
        maxEndTime: moment.Moment,
        prices: number[],
        durations: number[]
    ) => {
        await createSigmaHook({
            args: [
                contractAddress,
                tokenId,
                "0x0000000000000000000000000000000000000000",
                prices.map(price => ethers.utils.parseEther(price.toString())),
                durations.map(duration => Math.ceil(duration * 24 * 60 * 60)),
                maxEndTime.unix()
            ]
        })
    }

    // todo: call redeem on Market contract
    const redeemVNFT = async (tokenId: number) => {
        const durationList = await doNFTContract.getDurationIdList(tokenId);
        await redeem({
            args: [
                tokenId,
                durationList.map(duration => duration.toNumber())
            ]
        })
    }

    return {
        walletConnected: Boolean(address),
        stakedNFTs: isLoading ? [] : stakedNFTs.filter((_, index) => areVNFTs[index]),
        createSigma,
        lendLoading,
        lendSuccess,
        redeemVNFT,
    };
}

export default useStakedNFTs