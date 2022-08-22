import React from 'react'

import {
    VStack,
    Heading,
    Text,
} from '@chakra-ui/react'

const NotConnected : React.FC = () => {
  return (
    <VStack>
        <Heading>
            Not Connected
        </Heading>
        <Text>
            You must connect your wallet to access Decentralease.
        </Text>
    </VStack>
  )
}

export default NotConnected