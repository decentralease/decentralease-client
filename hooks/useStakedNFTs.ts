import { useState, useEffect } from "react";

import { useAddress, useContract } from "@thirdweb-dev/react";


import { Token } from "./types";
import moment from "moment";
import { ethers } from "ethers";

const useStakedNFTs = (contractAddress: string, chain = 'ethereum') => {

    const address = useAddress();

    const [stakedNFTs, setStakedNFTs] = useState<Token[]>([]);

    const { contract: doNFTContract } = useContract(contractAddress);

    const { contract: marketContract } = useContract(process.env.NEXT_PUBLIC_MARKET_ADDRESS);

    useEffect(() => {
        const getStakedNFTs = async () => {
            const stakedNFTs = [];
            const ownedDoNfts = await doNFTContract.nft.query.owned.all(address);
            await Promise.all(ownedDoNfts.map(async (ownedDoNft) => {
                const isVNFT = await doNFTContract.call("isVNft", ownedDoNft.metadata.id.toNumber());
                if (isVNFT) {
                    stakedNFTs.push({
                        name: ownedDoNft.metadata.name,
                        contractAddress,
                        tokenId: ownedDoNft.metadata.id.toNumber(),
                        image: ownedDoNft.metadata.image,
                    });
                }
            }))
            setStakedNFTs(stakedNFTs);
        }
        if (doNFTContract && address) {
            getStakedNFTs();
        }
    }, [address, doNFTContract, contractAddress]);

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
            ethers.utils.parseEther(pricePerDay.toString()),
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
        walletConnected: Boolean(address),
        stakedNFTs,
        createLendOrder,
        redeemVNFT,
    };
}

export default useStakedNFTs