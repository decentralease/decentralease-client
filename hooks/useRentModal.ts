import { useState } from "react";

import { 
    useContract,
    useContractData,
    useAddress,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const useRentModal = (contractAddress : string, tokenId : number) => {

    const address = useAddress();
    const { contract: marketContract } = useContract(process.env.NEXT_PUBLIC_MARKET_ADDRESS);
    const { contract: doNFTContract } = useContract(contractAddress);
    const { data: lendOrder } = useContractData(
        marketContract,
        "getLendOrder",
        contractAddress,
        tokenId
    );
    const { data: paymentNormal } = useContractData(
        marketContract,
        "getPaymentNormal",
        contractAddress,
        tokenId
    );


    const rent = async () => {
        const durationList = await doNFTContract.call("getDurationIdList", tokenId);
        await marketContract.call(
            "fulfillOrderNow", 
            contractAddress, 
            tokenId, 
            durationList[0].toNumber(), 
            Math.ceil(duration * 24 * 60 * 60), 
            address,
            {
                value: paymentNormal.pricePerDay.mul(duration)
            }
        );
    }

    const [duration, setDuration] = useState(0);

    const rentDetails = (lendOrder && paymentNormal) ? {
        price: parseFloat(ethers.utils.formatEther(paymentNormal.pricePerDay.toString())),
        maxEndTime: lendOrder.maxEndTime.toNumber(), 
    } : {};

    return {
        rentDetails,
        duration,
        setDuration,
        rent,
    }

}

export default useRentModal;