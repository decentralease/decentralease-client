import { useState, useEffect } from 'react';
import { getCollectionDetails } from '../services/nftQueries';

import { useContract } from '@thirdweb-dev/react';

import { Collection, Token } from "./types";

const defaultCollection = {
    name: "Default Collection",
    description: "Lorem ipsum dolor",
    bannerUrl: '/nft_banner.png',
    thumbnailUrl: '/collection_filler.png',
}

const useCollectionDetails = (contractAddress : string, chain = 'ethereum') => {

    const [collection, setCollection] = useState<Collection>(null);
    const [loading, setLoading] = useState(true);

    const { contract } = useContract(contractAddress);
    
    useEffect(() => {
        const fetchData = async () => {
            const collectionMetadata = await contract.metadata.get();
            setCollection({
                ...defaultCollection,
                name: collectionMetadata.name,
                description: collectionMetadata.description,
                thumbnailUrl: collectionMetadata.image,
                contractAddress
            })
            setLoading(false);
        }
        if(contract) {
            fetchData();
        }
    }, [contractAddress, contract]);
    
    return { collection, loading };
}

export default useCollectionDetails