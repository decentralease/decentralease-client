import { useState, useEffect } from 'react';
import { getLink } from '../services/ipfs';

import { Token } from './types';

const useToken = (contractAddress : string, tokenId : string) => {

    const [token, setToken] = useState<Token | null>(null);
    
    useEffect(() => {
        const getTokenData = async () => {
            const tokenData = await fetch(`https://api.nftport.xyz/v0/nfts/${contractAddress}/${tokenId}?chain=polygon`, {
                "method": "GET",
                "headers": {
                  "Content-Type": "application/json",
                  "Authorization": process.env.NEXT_PUBLIC_NFTPORT_API_KEY
                }
            })
              .then(response => response.json())
              .catch(err => err);
            if(tokenData.nft) {
                setToken(transformTokenResponse(tokenData.nft));
            }
        }
        getTokenData();
    }, [contractAddress, tokenId]);
    return token;
}

const transformTokenResponse = (tokenResponse : any) : Token => ({
    contractAddress: tokenResponse.contract_address,
    tokenId: tokenResponse.token_id,
    image: getLink(tokenResponse.file_url || tokenResponse.metadata.image),
    rate: 1,
    name: tokenResponse.metadata.name,
})

export default useToken;