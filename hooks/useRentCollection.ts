import { useContract } from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';

import moment from 'moment';

import { Token } from './types';
import { ethers } from 'ethers';

interface TokenForRent extends Token {
    minDuration: number,
    maxEndTime: moment.Moment,
}

const useRentCollection = (contractAddress : string) => {

    const { contract: marketContract } = useContract(process.env.NEXT_PUBLIC_MARKET_ADDRESS);

    const { contract: doNFTContract } = useContract(contractAddress);

    const [tokensForRent, setTokensForRent] = useState<TokenForRent[]>([]);
    const [loading, setLoading ] = useState<boolean>(true);  

    useEffect(() => {
        const getRentCollection = async () => {
            const totalSupply = await doNFTContract.call("totalSupply");
            const tokensForRent : TokenForRent[] = [];
            await Promise.all(Array.from({length: totalSupply.toNumber()}, (x, i) => (i + 1)).map(async (tokenId) => {
                const lendOrder = await marketContract.call('getLendOrder', contractAddress, tokenId);
                const maxEndTime = moment(lendOrder.maxEndTime.toNumber() * 1000);
                console.log(maxEndTime.format());
                if(maxEndTime.isAfter(moment())){
                    const tokenMetadata = await doNFTContract.nft.getTokenMetadata(tokenId);
                    const firstDuration = await doNFTContract.call('getDurationByIndex', tokenMetadata.id.toNumber(), 0);
                    if(moment().isAfter(moment(firstDuration.start.toNumber() * 1000))) {
                        tokensForRent.push({
                            contractAddress,
                            tokenId: tokenMetadata.id.toNumber(),
                            name: tokenMetadata.name,
                            image: tokenMetadata.image,
                            maxEndTime,
                            minDuration: lendOrder.minDuration.toNumber(),
                        });
                    }
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