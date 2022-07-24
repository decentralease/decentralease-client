import { useEffect, useState } from "react";

import { useAccount, useContractRead, useContractReads } from "wagmi";

import collectionABI from '../../abis/collection.json';

import { Token } from "../types";


const useOwnedNFTs = (contractAddress: string) => {


    const { address } = useAccount();

    const { data: balanceOf } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: collectionABI,
        functionName: 'balanceOf',
        args: [address]
    })

    const { data: ownedNFTsRaw } = useContractReads({
        contracts: Array.from(Array(balanceOf ? balanceOf.toNumber() : 0).keys()).map(tokenId => ({
            addressOrName: contractAddress,
            contractInterface: collectionABI,
            functionName: 'tokenOfOwnerByIndex',
            args: [address, tokenId]
        }))
    })

    const { data: ownedNFTsUris } = useContractReads({
        contracts: (ownedNFTsRaw || []).map(token => ({
            addressOrName: contractAddress,
            contractInterface: collectionABI,
            functionName: 'tokenURI',
            args: [token]
        }))
    })

    const ownedNFTs: Token[] = (ownedNFTsRaw || []).map(token => ({
        contractAddress,
        tokenId: token && token.toNumber(),
        name: 'AAA',
        image: 'https://ipfs.io/ipfs/QmWDUqzbCsGh3YLqssotJY3GCQVXmuPEj7spLQEpwgN9Jp/0.png',
    }))

    return {
        ownedNFTs,
    };
}

export default useOwnedNFTs;