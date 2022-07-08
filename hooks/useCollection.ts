import { useState, useEffect } from 'react';
import { getCollectionDetails } from '../services/nftQueries';

import { Collection, Token } from "./types";

const tokensData : Token[] = [
    {
        contractAddress: '0x0',
        tokenId: '0',
        image: '/collection_filler.png',
        rate: 7,
        name: 'Decentraland #1'
    },
    {
        contractAddress: '0x0',
        tokenId: '1',
        image: '/collection_filler.png',
        rate: 10,
        name: 'Decentraland #2'
    }
]

const defaultCollection = {
    name: "Default Collection",
    description: "Lorem ipsum dolor",
    bannerUrl: '/nft_banner.png',
    thumbnailUrl: '/collection_filler.png',
}

const useCollection = (contractAddress : string, chain = 'ethereum') => {

    const [collection, setCollection] = useState<Collection>(null);
    const [tokens, setTokens] = useState<Token[]>(tokensData);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getCollectionDetails(contractAddress, chain);
            if(data){
                setCollection(data);
            } else {
                setCollection({
                    ...defaultCollection,
                    contractAddress,
                });
            }
            setTokens(tokensData);
            setLoading(false);
        }
        if(contractAddress && !collection) {
            fetchData();
        }
    }, [contractAddress, chain, collection]);
    
    return { collection, tokens, loading };
}

export default useCollection