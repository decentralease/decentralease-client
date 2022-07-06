import { useState, useEffect } from 'react';

import { Collection, Token } from "./types";

const collectionData : Collection = {
    contractAddress: '0x0',
    title: 'Decentraland',
    description: 'Decentraland is a decentralized virtual world where you can build, sell, and buy metaverse items.',
    image: '/collection_filler.png'
}

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

const useCollection = (contractAddress : string) => {
    const [collection, setCollection] = useState<Collection>(collectionData);
    const [tokens, setTokens] = useState<Token[]>(tokensData);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            setCollection(collectionData);
            setTokens(tokensData);
            setLoading(false);
        };
        fetchData();
    }, []);
    
    return { collection, tokens, loading };
}

export default useCollection