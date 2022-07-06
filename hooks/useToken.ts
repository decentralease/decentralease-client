import { useState, useEffect } from 'react';

import { Token } from './types';
import useCollection from './useCollection';

const tokenData : Token = {
    contractAddress: '0x0',
    tokenId: '0',
    image: '/collection_filler.png',
    rate: 7,
    name: 'Decentraland #1'
}

const useToken = (contractAddress : string, tokenId : string) => {

    const { collection }  = useCollection(contractAddress)

    const [token, setToken] = useState<Token | null>(null);
    
    useEffect(() => {
        setToken(tokenData);
    }, []);
    
    return token;
}

export default useToken;