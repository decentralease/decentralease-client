import { useAccount, useContractWrite } from "wagmi"

import collectionABI from '../abis/collection.json'

// const pinataSDK = require('@pinata/sdk');
// const pinata = pinataSDK(process.env, 'yourPinataSecretApiKey');

const useMintNFT = (contractAddress : string) => {

    const { address } = useAccount();

    const { write } = useContractWrite({
        addressOrName: contractAddress,
        contractInterface: collectionABI,
        functionName: 'mintTo',
    })

    const mint = async (name: string, file: File) => {
        await write({args: [address, "ipfs://QmX16g5pZ9snEUxrjFWBZKvzXYfUJFou5hjsXAB7VKjZ5H/0"]});
    }

    return {
        mint
    }
}

export default useMintNFT