import { useState, useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";
import { chains_data } from "../pages/_app";

const useLayout = () => {

    const [connected, setConnected] = useState(false);
    const [correctChain, setCorrectChain] = useState(false);

    const { chain, chains } = useNetwork();
    const { address } = useAccount();

    useEffect(() => {
        if(address){
            setConnected(true);
        }
    }, [address])    

    useEffect(() => {
        if(chains_data.find(c => c.id === chain?.id)) {
            setCorrectChain(true);
        } else {
            setCorrectChain(false);
        }
    }, [chain])

    return { connected, correctChain };

}

export default useLayout;