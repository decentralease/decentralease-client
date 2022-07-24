import { useAccount, useContractRead, useContractWrite } from "wagmi";
import useApprovalForAll from "./useApprovalForAll";
import useOwnedNFTs from "./useOwnedNFTs";

import doNFTABI from '../../abis/doNFT.json'

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
    
    const { 
        approvedLoading,
        isApprovedForAll, 
        approveForAll,
    } = useApprovalForAll(String(originalAddress), contractAddress);

    const {ownedNFTs} = useOwnedNFTs(String(originalAddress));

    const mintVNFT = async (tokenId: number) => {
        await mintVNFTHook({args: [tokenId]});
        // setOwnedNFTs(ownedNFTs.filter(nft => nft.tokenId !== tokenId));
    }

    const stakeAndCreateSigma = async (
        tokenId: number,
        maxEndTime: moment.Moment,
        prices: number[],
        durations: number[]
    ) => {
        // return marketContract.call('mintAndCreateSigma',
        //     contractAddress,
        //     tokenId,
        //     "0x0000000000000000000000000000000000000000",
        //     prices.map(price => ethers.utils.parseEther(price.toString())),
        //     durations.map(duration => Math.ceil(duration * 24 * 60 * 60)),
        //     maxEndTime.unix()
        // )
    }

    return {
        walletConnected: Boolean(address),
        ownedNFTs, 
        approved: isApprovedForAll,
        loading: approvedLoading,
        approveForAll,
        mintVNFT,
        stakeAndCreateSigma
    }
};

export default useLendOwnedNFTs;