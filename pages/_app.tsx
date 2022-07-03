import '../styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react';
import theme from "../theme/theme";

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider
      theme={theme}
    >
      <ThirdwebProvider
        desiredChainId={ChainId.Mumbai}
      >
        <Component {...pageProps} />
      </ThirdwebProvider>
    </ChakraProvider>
  )
}

export default MyApp
