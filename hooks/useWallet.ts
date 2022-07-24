import { useAccount, useConnect } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'

const metamaskConnector = new MetaMaskConnector()
const coinbaseConnector = new CoinbaseWalletConnector({
    options: {
      appName: 'Decentralease',
    },
  })


const useWallet = () => {

    const { address } = useAccount()
    const { connect } = useConnect()

    const connectCoinbaseWallet = () => {
        connect({
            connector: coinbaseConnector,
        });
    }

    const connectMetamaskWallet = async () => {
        connect({
            connector: metamaskConnector,
        });
    }

    return {
        address,
        connectCoinbaseWallet,
        connectMetamaskWallet,
    }
}

export default useWallet;