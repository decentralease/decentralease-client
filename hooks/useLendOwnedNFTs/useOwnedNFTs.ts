import { useAddress, useContract } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

import { Token } from "../types";

const useOwnedNFTs = (contractAddress: string) => {

    const address = useAddress();

    const { contract } = useContract(contractAddress);

    const [ownedNFTs, setOwnedNFTs] = useState<Token[]>([]);

    useEffect(() => {
        const getOwnedNFTs = async () => {
            const nfts = await contract.nft.query.owned.all(address);
            setOwnedNFTs(nfts.map(nft => ({
                name: nft.metadata.name,
                contractAddress,
                tokenId: nft.metadata.id.toNumber(),
                image: nft.metadata.image,
                rate: 0
            })))
        }
        if(contract && address){
            getOwnedNFTs();
        }
    }, [contract, address, contractAddress])

    return {
        ownedNFTs,
        setOwnedNFTs
    };
}

export default useOwnedNFTs;