import { useState, useEffect } from 'react';

import { useContract, useContractCall } from '@thirdweb-dev/react';
import useWallet from './useWallet';

const use4907List = () => {

    const { address } = useWallet();
    const { contract, error } = useContract(process.env.NEXT_PUBLIC_DO_NFT_FACTORY_ADDRESS);

    const [newContractAddress, setNewContractAddress] = useState<string>('');

    const deployDoNFT = async (contractAddress : string) => {
        try {
            const data = await contract.call(
                "deployDoNFT",
                "aaa", 
                "aaa", 
                contractAddress, 
                address, 
                address, 
                address, 
                "aaa",
                {
                    gasLimit: 1000000
                }
            )
        }
        catch (error) {}
    }
    
    
    return {
        deployDoNFT,
        newContractAddress,
        error,
    };
}

export default use4907List;