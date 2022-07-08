import React from 'react'

import {
    Box,
    Heading
} from '@chakra-ui/react';
import Collections from './Collections';

const Marketplace : React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={8}
    >
        <Heading>
          Collections
        </Heading>
        <Collections />
    </Box>
  )
}

export default Marketplace