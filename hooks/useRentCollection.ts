import { useContract } from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';

import moment from 'moment';

import { Token } from './types';

const useRentCollection = (contractAddress : string) => {

    const { contract: marketContract } = useContract(process.env.NEXT_PUBLIC_MARKET_ADDRESS);

    const { contract: doNFTContract } = useContract(contractAddress);

    const [tokensForRent, setTokensForRent] = useState<Token[]>([]);
    const [loading, setLoading ] = useState<boolean>(true);  

    useEffect(() => {
        const getRentCollection = async () => {
            const totalSupply = await doNFTContract.call("totalSupply");
            const tokensForRent : Token[] = [];
            await Promise.all(Array.from({length: totalSupply.toNumber()}, (x, i) => (i + 1)).map(async (tokenId) => {
                const lendOrder = await marketContract.call('getLendOrder', contractAddress, tokenId);
                if(moment(lendOrder.maxEndTime.toNumber() * 1000).isAfter(moment())){
                    const tokenMetadata = await doNFTContract.nft.getTokenMetadata(tokenId);
                    tokensForRent.push({
                        tokenId,
                        name: tokenMetadata.name,
                        contractAddress,
                        image: tokenMetadata.image,
                    })
                }
            }));
            setTokensForRent(tokensForRent);
            setLoading(false);
        }
        if (doNFTContract && marketContract) {
            getRentCollection();
        }
    }, [doNFTContract, contractAddress, marketContract]);

    return {
        tokensForRent,
        loading,
    }

}

export default useRentCollection;