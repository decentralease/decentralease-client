import { 
    useCoinbaseWallet,
    useMetamask,
    useDisconnect,
    useAddress
} from "@thirdweb-dev/react";

const useWallet = () => {

    const address = useAddress();
    const connectWithCoinbaseWallet = useCoinbaseWallet();
    const connectMetamask = useMetamask();
    const disconnect = useDisconnect();

    const connectCoinbaseWallet = async () => {
        await connectWithCoinbaseWallet();
    }

    const connectMetamaskWallet = async () => {
        await connectMetamask();
    }

    return {
        address,
        connectCoinbaseWallet,
        connectMetamaskWallet,
        disconnect
    }
}

export default useWallet;