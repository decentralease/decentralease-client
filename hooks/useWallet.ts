import { 
    useCoinbaseWallet,
    useDisconnect,
    useAddress
} from "@thirdweb-dev/react";

const useWallet = () => {

    const address = useAddress();
    const connectWithCoinbaseWallet = useCoinbaseWallet();
    const disconnect = useDisconnect();

    const connect = async () => {
        await connectWithCoinbaseWallet();
    }

    return {
        address,
        connect,
        disconnect
    }
}

export default useWallet;