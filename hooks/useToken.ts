import { useState, useEffect } from 'react';
import { getLink } from '../services/ipfs';
import { getTokenDetails } from '../services/nftQueries';

import { Token } from './types';

const useToken = (contractAddress : string, tokenId : string) => {

    const [token, setToken] = useState<Token | null>(null);
    
    useEffect(() => {
        const getTokenData = async () => {
            const data = await getTokenDetails(contractAddress, tokenId);
            setToken(data);
        }
        getTokenData();
    }, [contractAddress, tokenId]);
    return token;
}

export default useToken;