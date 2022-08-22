import '../styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react';
import theme from "../theme/theme";

import Layout from '../layouts';

import { WagmiConfig, createClient, configureChains, Chain } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected'

const donau : Chain = {
  id: 199,
  name: "BitTorrent Chain Mainnet",
  network: "bittorrent",
  nativeCurrency: {
    decimals: 18,
    symbol: "BTT",
    name: "BitTorrent Token"
  },
  rpcUrls: {
    default: 'https://bttc.trongrid.io'
  },
  blockExplorers: {
    default: {
      name: "Block Explorer",
      url: "https://scan.bt.io"
    }
  },
  testnet: true
}

const mumbai : Chain = {
  id: 80001,
  name: "Polygon Mumbai Testnet",
  network: "mumbai",
  nativeCurrency: {
    decimals: 18,
    symbol: "MATIC",
    name: "Matic"
  },
  rpcUrls: {
    default: 'https://rpc-mumbai.maticvigil.com'
  },
  blockExplorers: {
    default: {
      name: "Block Explorer",
      url: "https://polygonscan.com/"
    }
  },
}

const { chains, provider } = configureChains([mumbai, donau], [
  publicProvider(),
  jsonRpcProvider({rpc: (chain) => (chain.id === donau.id ? {http: 'https://bttc.trongrid.io'} : null)}),
])

const client = createClient({
  autoConnect: true,
  provider,
  connectors: [new InjectedConnector({ chains })],
})

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider
      theme={theme}
    >
      <WagmiConfig 
        client={client}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default MyApp
