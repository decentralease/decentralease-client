import { useAddress, useContract, useContractData } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import useApprovalForAll from "./useApprovalForAll";
import useOwnedNFTs from "./useOwnedNFTs";

const useLendOwnedNFTs = (contractAddress: string) => {

    const address = useAddress();

    // doNFT address
    const { contract: doNFTContract } = useContract(contractAddress);

    const { contract: marketContract } = useContract(process.env.NEXT_PUBLIC_MARKET_ADDRESS);

    const { data: originalAddress } = useContractData(doNFTContract, 'getOriginalNftAddress');

    const { 
        approvedLoading,
        isApprovedForAll, 
        approveForAll,
    } = useApprovalForAll(originalAddress, contractAddress);

    const {ownedNFTs, setOwnedNFTs} = useOwnedNFTs(originalAddress);

    const mintVNFT = async (tokenId: number) => {
        await doNFTContract.call("mintVNft", tokenId);
        setOwnedNFTs(ownedNFTs.filter(nft => nft.tokenId !== tokenId));
    }

    const stakeAndList = async (
        tokenId: number, 
        maxEndTime: moment.Moment, 
        minDuration: number,
        pricePerDay: number,
    ) => {
        return marketContract.call(
            "mintAndCreateLendOrder",
            contractAddress,
            tokenId,
            maxEndTime.unix(),
            minDuration,
            ethers.utils.parseEther(pricePerDay.toString()),
            "0x0000000000000000000000000000000000000000"
        )
    };

    const stakeAndCreateSigma = async (
        tokenId: number,
        maxEndTime: moment.Moment,
        prices: number[],
        durations: number[]
    ) => {
        return marketContract.call('mintAndCreateSigma',
            contractAddress,
            tokenId,
            "0x0000000000000000000000000000000000000000",
            prices.map(price => ethers.utils.parseEther(price.toString())),
            durations.map(duration => Math.ceil(duration * 24 * 60 * 60)),
            maxEndTime.unix()
        )
    }

    return {
        walletConnected: Boolean(address),
        ownedNFTs, 
        approved: isApprovedForAll,
        loading: approvedLoading,
        approveForAll,
        mintVNFT,
        stakeAndList,
        stakeAndCreateSigma
    }
};

export default useLendOwnedNFTs;