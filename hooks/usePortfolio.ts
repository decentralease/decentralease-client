import { useState, useEffect } from 'react';
import useWallet from './useWallet';

import { Token } from './types';
import { getOwnedNFTs } from '../services/nftQueries';

const usePortfolio = () => {

    const { address } = useWallet(); 

    const [nfts, setNfts] = useState<Token[]>([]);

    useEffect(() => {
        const getNFTs = async () => {
            const data = await getOwnedNFTs(address);        
            setNfts(data);
        };
        if(address) {
            getNFTs();
        }
    }, [address]);

    return nfts;
}

export default usePortfolio;