import { useState, useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";

const useLayout = () => {

    const [connected, setConnected] = useState(false);
    const [correctChain, setCorrectChain] = useState(false);

    const { chain } = useNetwork();
    const { address } = useAccount();

    useEffect(() => {
        if(address){
            setConnected(true);
        }
    }, [address])    

    useEffect(() => {
        if(!chain?.unsupported){
            setCorrectChain(true);
        } else {
            setCorrectChain(false);
        }
    }, [chain])

    return { connected, correctChain };

}

export default useLayout;