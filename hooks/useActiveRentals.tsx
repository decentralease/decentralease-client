import { useState, useEffect } from 'react';

import { useAddress, useContract } from '@thirdweb-dev/react';

import { Token } from './types';

const useActiveRentals = (contractAddress : string) => {

    const address = useAddress();

    const [activeRentals, setActiveRentals] = useState<Token[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { contract: doNFTContract } = useContract(contractAddress);

    useEffect(() => {
        const getActiveRentals = async () => {
            const activeRentals : Token[] = [];
            const ownedNFTs = await doNFTContract.nft.query.owned.all(address);
            await Promise.all(ownedNFTs.map(async (nft) => {
                const isVNFT = await doNFTContract.call('isVNft', nft.metadata.id.toNumber());
                if(!isVNFT) {
                    activeRentals.push({
                        contractAddress,
                        tokenId: nft.metadata.id.toNumber(),
                        name: nft.metadata.name,
                        image: nft.metadata.image,
                    });
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
        activeRentals,
        loading
    }
}

export default useActiveRentals;