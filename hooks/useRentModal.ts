import { useState } from "react";

import { 
    useContract,
    useContractData,
    useAddress,
} from "@thirdweb-dev/react";

const useRentModal = (contractAddress : string, tokenId : number) => {

    const address = useAddress();
    const { contract } = useContract(process.env.NEXT_PUBLIC_MARKET_ADDRESS);
    const { data: lendOrder } = useContractData(
        contract,
        "getLendOrder",
        contractAddress,
        tokenId
    );
    const { data: paymentNormal } = useContractData(
        contract,
        "getPaymentNormal",
        process.env.NEXT_PUBLIC_DO_NFT_ADDRESS,
        tokenId
    );

    const rent = async () => {
        await contract.call(
            "fulfillOrderNow",
            contractAddress,
            tokenId,
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