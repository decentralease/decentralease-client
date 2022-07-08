import { useState } from "react";

import { ethers } from "ethers";

import { 
    useContract,
    useContractData,
    useContractCall,
    useAddress,
} from "@thirdweb-dev/react";

const useRentModal = (contractAddress : string, tokenId : string) => {

    const address = useAddress();
    const { contract } = useContract(process.env.NEXT_PUBLIC_MARKET_ADDRESS);
    const { data: lendOrder } = useContractData(
        contract,
        "getLendOrder",
        process.env.NEXT_PUBLIC_DO_NFT_ADDRESS,
        1
    );
    const { data: paymentNormal } = useContractData(
        contract,
        "getPaymentNormal",
        process.env.NEXT_PUBLIC_DO_NFT_ADDRESS,
        1
    );
    const { mutate: fulfillOrder } = useContractCall(
        contract, 
        "fulfillOrderNow",
    );

    const rent = async () => {
        await contract.call(
            "fulfillOrderNow",
            process.env.NEXT_PUBLIC_DO_NFT_ADDRESS,
            1,
            1,
            duration,
            address,
        );
    }

    const [duration, setDuration] = useState(0);

    const rentDetails = (lendOrder && paymentNormal) ? {
        price: paymentNormal.pricePerDay.toNumber(),
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