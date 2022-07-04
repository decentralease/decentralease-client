import { SimpleGrid } from '@chakra-ui/react';
import React from 'react'
import NFT from '../../components/card/NFT';

import { Token } from '../../hooks/types';

interface Props {
    collectionName: string;
    tokens: Token[];
}

const NFTs : React.FC<Props> = ({ collectionName, tokens }) => {
  return (
    <SimpleGrid
        columns={{ base: 2, xl: 3 }}
        spacing={8}
    >
        {
            tokens.map(token => (
                <NFT
                    key={token.contractAddress}
                    collectionName={collectionName}
                    token={token}
                />
            ))
        }
    </SimpleGrid>
  )
}

export default NFTs