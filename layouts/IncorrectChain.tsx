import React from 'react'

import { Heading, VStack, Text, Button } from '@chakra-ui/react'

import { useSwitchNetwork } from 'wagmi'


const IncorrectChain = () => {

    const { switchNetwork } = useSwitchNetwork()

  return (
    <VStack>
        <Heading>
            Incorrect Network
        </Heading>
        <Text>
            You must be on the BitTorrent Chain to access Decentralease.
        </Text>
        <Button
            variant='solid'
            colorScheme='brand'
            onClick={() => switchNetwork(199)}
        >
            Switch Networks
        </Button>
    </VStack>
  )
}

export default IncorrectChain