import { SimpleGrid } from '@chakra-ui/react';
import React from 'react'
import NFT from '../../components/card/NFT';

import { Token } from '../../hooks/types';

interface Props {
    tokens: Token[];
}

const NFTs : React.FC<Props> = ({ tokens }) => {
  return (
    <SimpleGrid
        columns={{ base: 2, xl: 3 }}
        spacing={8}
    >
        {
            tokens.map(token => (
                <NFT
                    key={token.contractAddress}
                    token={token}
                />
            ))
        }
    </SimpleGrid>
  )
}

export default NFTs