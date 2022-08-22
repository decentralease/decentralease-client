import React from 'react'

import { Heading, VStack, Text, Button, useDisclosure } from '@chakra-ui/react'

import SwitchNetworks from '../components/modals/SwitchNetworks'

const IncorrectChain = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <SwitchNetworks 
                isOpen={isOpen}
                onClose={onClose}
            />
            <VStack>
                <Heading>
                    Incorrect Network
                </Heading>
                <Text>
                    You must switch to a supported chain to access Decentralease.
                </Text>
                <Button
                    variant='solid'
                    colorScheme='brand'
                    onClick={onOpen}
                >
                    Switch Networks
                </Button>
            </VStack>
        </>
    )
}

export default IncorrectChain