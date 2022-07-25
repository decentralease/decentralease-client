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

    const mint = async (uri : string) => {
        await write({args: [address, uri]});
    }

    return {
        mint
    }
}

export default useMintNFT