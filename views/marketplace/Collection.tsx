import React from 'react'

import {
    Center,
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

    const { collection, tokens } = useCollection(contractAddress);

    return (
        <Container
            gap={8}
            display='flex'
            flexDirection='column'
            alignItems='center'
            maxW="3xl"
        >
            <Image
                alt="Banner Image"
                src={'/nft_banner.png'}
                width="100%"
                borderRadius={'2rem'}
            />
            <VStack
                alignItems='center'
            >
                <Heading>{collection.title}</Heading>
                <Text>{collection.description}</Text>
            </VStack>
            <NFTs
                collectionName={collection.title}
                tokens={tokens}
            />
        </Container>
    )
}

export default Collection