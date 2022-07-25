import { useEffect, useState } from "react";

import { useAccount, useContractRead, useContractReads } from "wagmi";

import collectionABI from '../../abis/collection.json';
import { getLink } from "../../services/ipfs";

import { Token } from "../types";


const useOwnedNFTs = (contractAddress: string) => {


    const { address } = useAccount();

    const { data: balanceOf } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: collectionABI,
        functionName: 'balanceOf',
        args: [address],
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

    const [ownedNFTs, setOwnedNFTs] = useState<Token[]>([]);

    useEffect(() => {
        const getTokenMetadata = async () => {
            const metadata = await Promise.all(ownedNFTsUris.map(async uri => (
                fetch(getLink(String(uri))).then(res => res.json())
            )))
            setOwnedNFTs(ownedNFTsRaw.map((token, i) => ({
                contractAddress,
                name: metadata[i].name,
                tokenId: token && token.toNumber(),
                image: getLink(metadata[i].image),
            })))
        }
        if(ownedNFTsRaw && ownedNFTsUris) {
            getTokenMetadata();
        }
    }, [ownedNFTsRaw, ownedNFTsUris, contractAddress])

    return {
        ownedNFTs,
    };
}

export default useOwnedNFTs;