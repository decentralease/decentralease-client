import '../styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react';
import theme from "../theme/theme";

import { ChainId, ThirdwebProvider, IpfsStorage } from "@thirdweb-dev/react";
import Layout from '../layouts';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider
      theme={theme}
    >
      <ThirdwebProvider
        desiredChainId={ChainId.Mumbai}
        storageInterface={new IpfsStorage("https://ipfs.io/ipfs/")}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThirdwebProvider>
    </ChakraProvider>
  )
}

export default MyApp
