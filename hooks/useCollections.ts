import { useState, useEffect } from "react";
import { useNetwork } from "wagmi";

import { getCollections } from "../data/contracts"; 

const useCollections = () => {

    const [collections, setCollections] = useState<string[]>([]);

    const { chain } = useNetwork();

    useEffect(() => {
        if (chain && collections.length === 0) {
            setCollections(getCollections(chain.id));
        }
    })

    return collections;
}

export default useCollections;