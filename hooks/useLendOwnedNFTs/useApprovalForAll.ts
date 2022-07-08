import { useAddress, useContract, useContractData } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

const useApprovalForAll = (contractAddress: string, operator: string) => {

    const address = useAddress();

    const { contract, error } = useContract(contractAddress);

    const [approvedLoading, setApprovedLoading] = useState<boolean>(true);
    const [isApprovedForAll, setIsApprovedForAll] = useState<boolean>(false);

    useEffect(() => {
        const isApprovedForAll = async () => {
            setIsApprovedForAll(await contract.call("isApprovedForAll", address, operator));
            setApprovedLoading(false);
        }
        if(contract && address) {
            isApprovedForAll();
        }
    }, [contract, address, operator]);

    const approveForAll = async () => {
        await contract.call(
            "setApprovalForAll",
            operator,
            true
        );
        setIsApprovedForAll(true);
    }

    return {
        approvedLoading,
        isApprovedForAll,
        approveForAll
    }

}

export default useApprovalForAll;