import React from 'react'

import {
    VStack,
    Heading,
    Icon,
} from '@chakra-ui/react';

import {
    CheckCircleIcon
} from '@chakra-ui/icons'



const Success = () => {
  return (
    <VStack>
        <CheckCircleIcon 
            h={50}
            w={50}
            color='brand.500'
        />
        <Heading>
            Success!
        </Heading>
    </VStack>
  )
}

export default Success