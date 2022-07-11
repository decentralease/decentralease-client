import React from 'react'

import {
    Heading,
    VStack,
    Button,
    Link,
    useColorModeValue
} from '@chakra-ui/react';
import Card from '../../components/card/Card';
import CollectionsPreview from './CollectionsPreview';

const Home = () => {

  const headingColor = useColorModeValue('brand.500', 'white');
  const textColor = useColorModeValue("black", "brand.200");

  return (
    <VStack
      spacing={8}
    >
      <VStack
        alignItems='center'
        spacing={2}
      >
        <Heading
          color={headingColor}
          textAlign='center'
        >
          Welcome to Decentralease
        </Heading>
        <Heading
          size='md'
          color={textColor}
          textAlign='center'
        >
          Powering the Next Generation of Digital Assets
        </Heading>
      </VStack>
      <Card
        display='flex'
        flexDirection='column'
        gap={4}
        w="100%"
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