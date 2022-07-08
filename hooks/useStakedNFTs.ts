import { useState, useEffect } from "react";

import { useAddress, useContract } from "@thirdweb-dev/react";


import { Token } from "./types";
import moment from "moment";

const useStakedNFTs = (contractAddress: string, chain = 'ethereum') => {

    const address = useAddress();

    const [stakedNFTs, setStakedNFTs] = useState<Token[]>([]);

    const { contract: doNFTContract } = useContract(contractAddress);

    const { contract: marketContract } = useContract(process.env.NEXT_PUBLIC_MARKET_ADDRESS);

    useEffect(() => {
        const getStakedNFTs = async () => {
            const stakedNFTs = await doNFTContract.nft.query.owned.all(address);
            setStakedNFTs(stakedNFTs.map(nft => ({
                name: nft.metadata.name,
                contractAddress,
                tokenId: nft.metadata.id.toNumber(),
                image: nft.metadata.image,
                rate: 0
            })));
        }
        if (doNFTContract && address) {
            getStakedNFTs();
        }
    }, [address, doNFTContract, contractAddress]);

    // todo: call createLendOrder on Market contract
    const createLendOrder = async (
        tokenId: number, 
        maxEndTime: moment.Moment, 
        minDuration: number,
        pricePerDay: number,
    ) => {
        marketContract.call(
            'createLendOrder',
            contractAddress,
            tokenId, 
            maxEndTime.unix(),
            minDuration,
            pricePerDay,
            "0x0000000000000000000000000000000000000000"
        );
    }

    // todo: call redeem on Market contract
    const redeemVNFT = async (tokenId: number) => {
        const durationList = await doNFTContract.call("getDurationIdList", tokenId);
        doNFTContract.call(
            'redeem',
            tokenId,
            durationList.map(duration => duration.toNumber())
        )
    }

    return { 
        stakedNFTs,
        createLendOrder,
        redeemVNFT,
    };
}

export default useStakedNFTs