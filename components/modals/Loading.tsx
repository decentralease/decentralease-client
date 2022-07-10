import React from 'react'

import {
    Spinner,
    Heading,
    VStack
} from '@chakra-ui/react'

const Loading = () => {
  return (
    <VStack
        spacing={8}
    >
        <Spinner 
            size={'xl'}
            color='brand.500'
        />
        <Heading
            size={'md'}
        >
            Transaction in Progress...
        </Heading>
    </VStack>
  )
}

export default Loading