import React from 'react'

import {
    Heading,
    VStack
} from '@chakra-ui/react'
import Collections from './Collections'

const LendView = () => {
  return (
    <VStack
        spacing={8}
    >
        <Heading
            size='lg'
        >
            Collections
        </Heading>
        <Collections />
    </VStack>
  )
}

export default LendView