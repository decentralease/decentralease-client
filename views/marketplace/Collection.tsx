import React from 'react'

import {
    Spinner,
    Text,
    Heading,
    Image,
    VStack,
    Container
} from '@chakra-ui/react';

import useCollection from '../../hooks/useCollection';
import NFTs from './NFTs';

interface Props {
    contractAddress: string;
}

const Collection : React.FC<Props> = ({ contractAddress }) => {

    const { collection, tokens, loading } = useCollection(contractAddress);

    if(loading) {
        return (
            <VStack>
                <Spinner 
                    size='xl'
                />
                <Text>Loading...</Text>
            </VStack>
        )
    } else {
        return (
            <Container
                gap={8}
                display='flex'
                flexDirection='column'
                alignItems='center'
                maxW="3xl"
                py='1rem'
            >
                <Image
                    alt="Banner Image"
                    src={collection.bannerUrl}
                    maxHeight="200px"
                    borderRadius={'2rem'}
                />
                <VStack
                    alignItems='center'
                >
                    <Heading>{collection.name}</Heading>
                    <Text>{collection.description}</Text>
                </VStack>
                <NFTs
                    collectionName={collection.name}
                    tokens={tokens}
                />
            </Container>
        )
    }
}

export default Collection