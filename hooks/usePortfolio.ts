import { useState, useEffect, useCallback } from 'react';
import useWallet from './useWallet';

import { Token } from './types';
import { getLink } from '../services/ipfs';

const usePortfolio = () => {

    const { address } = useWallet(); 

    const [nfts, setNfts] = useState<Token[]>([]);

    useEffect(() => {
        const getNFTs = async () => {
            const data = await fetch(`https://api.nftport.xyz/v0/accounts/${address}?chain=polygon&include=metadata`, {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": process.env.NEXT_PUBLIC_NFTPORT_API_KEY
                }
            })
                .then(response => response.json())
                .catch(err => {
                    console.error(err);
                });
                        
            setNfts(data.nfts.filter(nft => (nft.name || nft.file_url)).map(nft => ({
                contractAddress: nft.contract_address,
                tokenId: nft.token_id,
                image: getLink(nft.file_url),
                rate: 1,
                name: nft.name,
            })));
        };
        if(address) {
            getNFTs();
        }
    }, [address]);

    return nfts;
}

export default usePortfolio;