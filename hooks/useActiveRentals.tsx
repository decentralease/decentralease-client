import { useState, useEffect } from 'react';

import { useAccount, useContract, useProvider } from 'wagmi';

import useOwnedNFTs from './useLendOwnedNFTs/useOwnedNFTs';

import moment from 'moment';

import doNFTABI from '../abis/doNFT.json';

import { Token } from './types';

interface ActiveRental extends Token {
    endTime: moment.Moment
}

const useActiveRentals = (contractAddress : string) => {

    const { address } = useAccount();
    const provider = useProvider();

    const [activeRentals, setActiveRentals] = useState<ActiveRental[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { ownedNFTs } = useOwnedNFTs(contractAddress);

    const doNFTContract = useContract({
        addressOrName: contractAddress,
        contractInterface: doNFTABI,
        signerOrProvider: provider
    });

    useEffect(() => {
        const getActiveRentals = async () => {
            const activeRentals : ActiveRental[] = [];
            await Promise.all(ownedNFTs.map(async (nft) => {
                const isVNFT = await doNFTContract.isVNft(nft.tokenId);
                if(!isVNFT) {
                    const doNftInfo = await doNFTContract.getDoNftInfo(nft.tokenId);
                    const endTime = moment(doNftInfo.ends[0].toNumber() * 1000);
                    if(
                        moment().isBefore(endTime) &&
                        moment().isAfter(moment(doNftInfo.starts[0].toNumber() * 1000))
                    ) {
                        activeRentals.push({
                            contractAddress,
                            tokenId: nft.tokenId,
                            name: nft.name,
                            image: nft.image,
                            endTime
                        });
                    }   
                }
            }))
            setActiveRentals(activeRentals);
            setLoading(false);
        }
        if(ownedNFTs){
            getActiveRentals();
        }
    }, [doNFTContract, address, ownedNFTs, contractAddress]);

    return {
        walletConnected: Boolean(address),
        activeRentals,
        loading
    }
}

export default useActiveRentals;