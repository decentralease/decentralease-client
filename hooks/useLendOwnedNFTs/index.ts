import { useAccount, useContractRead, useContractWrite } from "wagmi";
import useApprovalForAll from "./useApprovalForAll";
import useOwnedNFTs from "./useOwnedNFTs";

import { ethers } from "ethers";

import doNFTABI from '../../abis/doNFT.json'
import marketABI from '../../abis/market.json'

const useLendOwnedNFTs = (contractAddress: string) => {

    const { address } = useAccount();

    const { data: originalAddress } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: doNFTABI,
        functionName: 'getOriginalNftAddress',
    })

    const { write: mintVNFTHook} = useContractWrite({
        addressOrName: contractAddress,
        contractInterface: doNFTABI,
        functionName: 'mintVNft',
    })
    
    const { write: mintAndCreateSigmaHook, isLoading: lendLoading, isSuccess: lendSuccess} = useContractWrite({
        addressOrName: process.env.NEXT_PUBLIC_MARKET_ADDRESS,
        contractInterface: marketABI,
        functionName: 'mintAndCreateSigma',
    })
    
    const { 
        approvedLoading,
        isApprovedForAll, 
        approveForAll,
    } = useApprovalForAll(String(originalAddress), contractAddress);

    const {ownedNFTs} = useOwnedNFTs(String(originalAddress));

    const mintVNFT = async (tokenId: number) => {
        await mintVNFTHook({args: [tokenId]});
    }

    const stakeAndCreateSigma = async (
        tokenId: number,
        maxEndTime: moment.Moment,
        prices: number[],
        durations: number[]
    ) => {
        return mintAndCreateSigmaHook({
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

    return {
        walletConnected: Boolean(address),
        ownedNFTs, 
        approved: isApprovedForAll,
        loading: approvedLoading,
        approveForAll,
        mintVNFT,
        lendLoading,
        lendSuccess,
        stakeAndCreateSigma
    }
};

export default useLendOwnedNFTs;