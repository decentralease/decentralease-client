import { useState, useEffect } from 'react';
import { Collection } from "./types";
import { getCollectionMetadata } from '../data/contracts';

const useCollectionDetails = (contractAddress : string) => {

    const [collection, setCollection] = useState<Collection>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setCollection(getCollectionMetadata(contractAddress));
        setLoading(false);
    }, [contractAddress]);
    
    return { collection, loading };
}

export default useCollectionDetails