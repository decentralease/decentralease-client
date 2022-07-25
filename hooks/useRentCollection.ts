import { useContractRead, useContractReads } from 'wagmi'

import moment from 'moment';

import { Token } from './types';

interface TokenForRent extends Token {
    minDuration: number,
    maxEndTime: moment.Moment,
}

import marketABI from '../abis/market.json';
import doNFTABI from '../abis/doNFT.json';
import { useEffect, useState } from 'react';
import { getLink } from '../services/ipfs';

const useRentCollection = (contractAddress : string) => {

    const { data: curDoid } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: doNFTABI,
        functionName: 'curDoid',
    });

    const { data: lendOrders, isLoading: lendOrdersLoading } = useContractReads({
        contracts: Array.from({length: curDoid?.toNumber() || 0}, (x, i) => (i + 1)).map(tokenId => ({
            addressOrName: process.env.NEXT_PUBLIC_MARKET_ADDRESS,
            contractInterface: marketABI,
            functionName: 'getLendOrder',
            args: [contractAddress, tokenId],
        }))
    })

    const { data: tokenUris, isLoading: tokenUrisLoading } = useContractReads({
        contracts: lendOrders?.map(({ nftId }) => ({
            addressOrName: contractAddress,
            contractInterface: doNFTABI,
            functionName: 'tokenURI',
            args: [nftId]
        })) || []
    })

    const { data: durations, isLoading: durationsLoading } = useContractReads({
        contracts: lendOrders?.map(lendOrder => ({
            addressOrName: contractAddress,
            contractInterface: doNFTABI,
            functionName: 'getDurationByIndex',
            args: [lendOrder.nftId, 0],
        })) || [],
    })

    const [tokensForRent, setTokensForRent] = useState<TokenForRent[]>([]);

    useEffect(() => {
        const getTokenMetadata = async () => {
            const metadata = await Promise.all(tokenUris
                .map(async uri => (
                    Boolean(uri) ? fetch(getLink(String(uri))).then(res => res.json()) : ""
                )))
            console.log(metadata);
            setTokensForRent(lendOrders
                .map((lendOrder, index) => ({
                    contractAddress,
                    tokenId: lendOrder.nftId,
                    name: metadata[index].name,
                    image: getLink(metadata[index].image),
                    maxEndTime: moment(lendOrder.maxEndTime.toNumber() * 1000),
                    minDuration: lendOrder.minDuration.toNumber(),
                }))
                .filter((_, index) => Boolean(durations[index]) && moment().isAfter(moment(durations[index].start.toNumber() * 1000))))
        }
        if(lendOrders && durations && tokenUris) {
            console.log(lendOrders, durations, tokenUris);
            getTokenMetadata();
        }
    }, [lendOrders, durations, contractAddress, tokenUris])

    return {
        tokensForRent,
        loading: durationsLoading || lendOrdersLoading,
    }

}

export default useRentCollection;