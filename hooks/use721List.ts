import { useState } from 'react';

import { useAccount } from 'wagmi';

import useWallet from './useWallet';

const use721List = () => {

    const { address } = useAccount();
    // const { contract, error } = useContract(process.env.NEXT_PUBLIC_DO_NFT_FACTORY_ADDRESS);
    // const {
    //     mutate: deployDoNFTFunction,
    //     isLoading,
    //     error: deployDoNFTError,
    // } = useContractCall(contract, "deployDoNFT");

    // const [newContractAddress, setNewContractAddress] = useState<string>('');

    // const deployDoNFT = async (contractAddress : string) => {
    //     try {
    //         const data = await contract.call(
    //             "deployDoNFT", 
    //             "aaa", 
    //             "aaa", 
    //             contractAddress, 
    //             address, 
    //             address, 
    //             address, 
    //             "aaa",
    //             {
    //                 gasLimit: 1000000
    //             }
    //         )
    //     }
    //     catch (error) {}
    // }
    
    
    // return {
    //     deployDoNFT,
    //     newContractAddress,
    //     error: deployDoNFTError,
    // };
}

export default use721List;