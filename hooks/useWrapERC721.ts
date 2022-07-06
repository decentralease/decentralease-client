import { useState, useEffect } from 'react';


const useWrapERC721 = () => {

    const [wrappedContractAddress, setWrappedContractAddress] = useState<string>('');
    const [error, setError] = useState<string>('');
    
    const wrap = async (address : string) => {
        try {
            // const result = await wrapERC721(address);
            setWrappedContractAddress("0xABC");
        } catch (error) {
            setError(error.message);
        }
    }
    
    return {
        wrap,
        wrappedContractAddress,
        error
    };
}

export default useWrapERC721;