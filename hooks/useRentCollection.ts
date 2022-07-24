import { useContract, useContractRead, useProvider, useSigner } from 'wagmi'
import { useEffect, useState } from 'react';

import moment from 'moment';

import { Token } from './types';
import { Contract } from 'ethers';

interface TokenForRent extends Token {
    minDuration: number,
    maxEndTime: moment.Moment,
}

import marketABI from '../abis/market.json';
import doNFTABI from '../abis/doNFT.json';

const useRentCollection = (contractAddress : string) => {

    const provider = useProvider();

    const marketContract = useContract({
        addressOrName: process.env.NEXT_PUBLIC_MARKET_ADDRESS,
        contractInterface: marketABI,
        signerOrProvider: provider,
    });

    const doNFTContract = useContract({
        addressOrName: contractAddress,
        contractInterface: doNFTABI,
        signerOrProvider: provider,
    });

    const [tokensForRent, setTokensForRent] = useState<TokenForRent[]>([]);
    const [loading, setLoading ] = useState<boolean>(true);  

    useEffect(() => {
        const getRentCollection = async () => {
            const totalSupply = await doNFTContract.curDoid();
            const tokensForRent : TokenForRent[] = [];
            await Promise.all(Array.from({length: totalSupply.toNumber()}, (x, i) => (i + 1)).map(async (tokenId) => {
                const lendOrder = await marketContract.getLendOrder(contractAddress, tokenId);
                const maxEndTime = moment(lendOrder.maxEndTime.toNumber() * 1000);
                if(maxEndTime.isAfter(moment())){
                    // const tokenMetadata = await doNFTContract.nft.getTokenMetadata(tokenId);
                    const firstDuration = await doNFTContract.getDurationByIndex(tokenId, 0);
                    if(moment().isAfter(moment(firstDuration.start.toNumber() * 1000))) {
                        tokensForRent.push({
                            contractAddress,
                            tokenId,
                            name: "Jason",
                            image: 'https://ipfs.io/ipfs/QmWDUqzbCsGh3YLqssotJY3GCQVXmuPEj7spLQEpwgN9Jp/0.png',
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