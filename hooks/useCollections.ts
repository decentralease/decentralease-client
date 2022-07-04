import { useState, useEffect } from 'react';

import { Collection } from './types';

const collectionsData : Collection[] = [
    {
        contractAddress: '0x0',
        title: 'Decentraland',
        description: 'Decentraland is a decentralized virtual world where you can build, sell, and buy metaverse items.',
        image: '/collection_filler.png'
    },
    {
        contractAddress: '0x0',
        title: 'ENS',
        description: 'The Ethereum Name Service (ENS) is a decentralized registry that maps domain names to public addresses.',
        image: '/collection_filler.png'
    },
    {
        contractAddress: '0x0',
        title: 'DeRace',
        description: 'DeRace is a decentralized virtual world where breed and race digital horses.',
        image: '/collection_filler.png'
    }
];


const useCollections = () => {

    const [collections, setCollections] = useState<Collection[]>([]);
    
    useEffect(() => {
        const fetchCollections = async () => {
            setCollections(collectionsData);
        }
        fetchCollections();
    }, []);
    
    return collections;
}

export default useCollections;