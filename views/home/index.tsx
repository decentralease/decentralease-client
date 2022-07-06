import React from 'react'

import {
    Container,
    Heading,
    Text,
    VStack,
    Button,
    Link
} from '@chakra-ui/react';
import Card from '../../components/card/Card';
import CollectionsPreview from './CollectionsPreview';

const Home = () => {
  return (
    <Container
      display='flex'
      flexDirection='column'
      alignItems='center'
      gap={8}
    >
      <VStack
        alignItems='center'
        spacing={2}
      >
        <Heading
          color='brand.500'
        >
          Welcome to Rentify
        </Heading>
        <Heading
          size='md'
        >
          Web3 Game Financialization, Reimagined
        </Heading>
      </VStack>
      <Card>
        <Heading
          size='lg'
          textAlign='center'
        >
          Thesis
        </Heading>
        <Text
          textAlign='center'
        >
          Rentify redefines play-to-earn gaming by separating the financialization
          of game assets from their in-game utility. We do this by introducing a user
          role in addition to owner role which exists on the ERC-721 and ERC-1155 standards.
        </Text>
      </Card>
      <Card
        display='flex'
        flexDirection='column'
        gap={4}
      >
        <VStack>
          <VStack>
            <Heading
              size='lg'
            >
              Marketplace
            </Heading>
            <Heading
              size='sm'
            >
              Featured Collections
            </Heading>
          </VStack>
          <CollectionsPreview />
          <Link
            href='/marketplace'
          >
            <Button>
              View Marketplace
            </Button>
          </Link>
        </VStack>
      </Card>
    </Container>
  )
}

export default Home