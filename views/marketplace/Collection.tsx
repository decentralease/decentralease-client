import React from 'react'

import {
    Spinner,
    Text,
    Heading,
    Image,
    VStack,
    Container,
    Box
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
                <VStack
                    position='relative'
                    mb={'30px'}
                >
                    <Image
                        alt="Banner Image"
                        src={collection.bannerUrl}
                        maxHeight="200px"
                        borderRadius={'2rem'}
                    />
                    <Image
                        alt="Logo Image"
                        src={collection.thumbnailUrl}
                        position='absolute'
                        height={'60px'}
                        bottom={'-30px'}
                    />
                </VStack>
                <VStack
                    alignItems='center'
                >
                    <Heading>{collection.name}</Heading>
                    <Text
                        textAlign='center'
                    >
                        {collection.description}
                    </Text>
                </VStack>
                <NFTs
                    tokens={tokens}
                />
            </Container>
        )
    }
}

export default Collection