import { useState, useEffect } from 'react';

import { useAddress, useContract } from '@thirdweb-dev/react';

import moment from 'moment';

import { Token } from './types';

interface ActiveRental extends Token {
    endTime: moment.Moment
}

const useActiveRentals = (contractAddress : string) => {

    const address = useAddress();

    const [activeRentals, setActiveRentals] = useState<ActiveRental[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { contract: doNFTContract } = useContract(contractAddress);

    useEffect(() => {
        const getActiveRentals = async () => {
            const activeRentals : ActiveRental[] = [];
            const ownedNFTs = await doNFTContract.nft.query.owned.all(address);
            await Promise.all(ownedNFTs.map(async (nft) => {
                const isVNFT = await doNFTContract.call('isVNft', nft.metadata.id.toNumber());
                if(!isVNFT) {
                    const doNftInfo = await doNFTContract.call('getDoNftInfo', nft.metadata.id.toNumber());
                    const endTime = moment(doNftInfo.ends[0].toNumber() * 1000);
                    if(
                        moment().isBefore(endTime) &&
                        moment().isAfter(moment(doNftInfo.starts[0].toNumber() * 1000))
                    ) {
                        activeRentals.push({
                            contractAddress,
                            tokenId: nft.metadata.id.toNumber(),
                            name: nft.metadata.name,
                            image: nft.metadata.image,
                            endTime
                        });
                    }   
                }
            }))
            setActiveRentals(activeRentals);
            setLoading(false);
        }
        if(doNFTContract){
            getActiveRentals();
        }
    }, [doNFTContract, address, contractAddress]);

    return {
        walletConnected: Boolean(address),
        activeRentals,
        loading
    }
}

export default useActiveRentals;