import { useState, useEffect } from 'react';
import { Collection } from "./types";
import { getCollectionMetadata } from '../data/contracts';
import { useNetwork } from 'wagmi';

const useCollectionDetails = (contractAddress : string) => {

    const { chain } = useNetwork();

    const [collection, setCollection] = useState<Collection>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if(chain?.id) {
            setCollection(getCollectionMetadata(chain.id, contractAddress));
            setLoading(false);
        }
    }, [chain, contractAddress]);
    
    return { collection, loading };
}

export default useCollectionDetails