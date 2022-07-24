import { useAccount, erc721ABI, useContractRead, useContractWrite } from "wagmi";

const useApprovalForAll = (contractAddress: string, operator: string) => {

    const { address } = useAccount();

    const { data: approvedForAll, isLoading, isError } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: erc721ABI,
        functionName: 'isApprovedForAll',
        args: [address, operator]
    })

    const { write: approveForAll } = useContractWrite({
        addressOrName: contractAddress,
        contractInterface: erc721ABI,
        functionName: 'setApprovalForAll',
        args: [operator, true]
    })

    return {
        approvedLoading: isLoading,
        isApprovedForAll: Boolean(approvedForAll),
        approveForAll
    }

}

export default useApprovalForAll;