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
    <VStack
      spacing={8}
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
            href='/rent'
          >
            <Button>
              View Rentals
            </Button>
          </Link>
        </VStack>
      </Card>
    </VStack>
  )
}

export default Home