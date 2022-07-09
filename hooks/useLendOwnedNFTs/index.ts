import { useState, useEffect } from "react";

import { useAddress, useContract, useContractData } from "@thirdweb-dev/react";
import useApprovalForAll from "./useApprovalForAll";
import useOwnedNFTs from "./useOwnedNFTs";

const useLendOwnedNFTs = (contractAddress: string, chain = 'ethereum') => {

    const address = useAddress();

    // doNFT address
    const { contract: doNFTContract } = useContract(contractAddress);

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

    return {
        walletConnected: Boolean(address),
        ownedNFTs, 
        approved: isApprovedForAll,
        loading: approvedLoading,
        approveForAll,
        mintVNFT
    }
};

export default useLendOwnedNFTs;