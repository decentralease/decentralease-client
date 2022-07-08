import React from 'react'

import { 
    VStack,
    Image,
    Heading,
    Text,
    Spinner,
} from '@chakra-ui/react';

import useCollectionDetails from '../../hooks/useCollectionDetails';


interface Props {
    contractAddress: string;
}

const CollectionDetails : React.FC<Props> = ({ contractAddress }) => {

    const { collection, loading } = useCollectionDetails(contractAddress);

    if(loading) {
        <VStack>
            <Spinner 
                size='xl'
            />
        </VStack>
    }
    if(!collection) {
        return null;
    }
    return (
        <VStack
            spacing={8}
        >
            <VStack>
                <Image
                    alt="Logo Image"
                    src={collection.thumbnailUrl}
                    maxHeight={'200px'}
                    borderRadius={'1rem'}
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
        </VStack>
    )
}

export default CollectionDetails