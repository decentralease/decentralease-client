import React from 'react'

import {
  VStack,
  Heading,
  SimpleGrid
} from '@chakra-ui/react'

import usePortfolio from '../../hooks/usePortfolio'
import NFT from '../../components/card/NFT';

const WalletView = () => {

  const nfts = usePortfolio();

  return (
    <VStack
      spacing={8}
    >
      <Heading
        size='lg'
      >
        Your NFTs
      </Heading>
      <SimpleGrid
        columns={{base: 2, md: 3, lg: 4}}
        spacing={4}
      >
        {
          nfts.map((nft, index) => (
            <NFT 
              key={index}
              token={nft}
              collectionName='portfolio'
            />
          ))
        }
      </SimpleGrid>
    </VStack>
  )
}

export default WalletView