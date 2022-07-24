import '../styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react';
import theme from "../theme/theme";

import Layout from '../layouts';

import { WagmiConfig, createClient, configureChains, defaultChains, Chain } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { InjectedConnector } from 'wagmi/connectors/injected'

const donau : Chain = {
  id: 1029,
  name: "BitTorrent Chain Donau",
  network: "donau",
  /** Currency used by chain */
  nativeCurrency: {
    decimals: 18,
    symbol: "BTT",
    name: "BitTorrent Token"
  },
  rpcUrls: {
    default: 'https://pre-rpc.bt.io/'
  },
  blockExplorers: {
    default: {
      name: "Block Explorer",
      url: "https://testscan.bt.io/"
    }
  },
  testnet: true
}

const { chains, provider } = configureChains([donau], [
  jsonRpcProvider({rpc: () => ({http: 'https://pre-rpc.bt.io/'})})
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
