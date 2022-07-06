import { useState, useEffect } from 'react';

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

const useCollection = (contractAddress : string) => {

    const [collection, setCollection] = useState<Collection>(null);
    const [tokens, setTokens] = useState<Token[]>(tokensData);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`https://api.nftport.xyz/v0/nfts/${contractAddress}?chain=ethereum`, {
                "method": "GET",
                "headers": {
                  "Content-Type": "application/json",
                  "Authorization": process.env.NEXT_PUBLIC_NFTPORT_API_KEY
                }
              })
              .then(response => response.json())
              .catch(err => err);
            if(data.contract){
                setCollection(transformCollectionResponse({...data.contract, contractAddress}));
                setTokens(tokensData);
                setLoading(false);
            }
        };
        fetchData();
    }, [contractAddress]);
    
    return { collection, tokens, loading };
}

const transformCollectionResponse = (collectionResponse : any) : Collection => ({
    contractAddress: collectionResponse.contractAddress,
    name: collectionResponse.name,
    description: collectionResponse.metadata.description,
    thumbnailUrl: collectionResponse.metadata.thumbnail_url,
    bannerUrl: collectionResponse.metadata.banner_url
})

export default useCollection