import { SimpleGrid } from '@chakra-ui/react';
import React from 'react'
import Collection from '../../components/card/Collection';
import useCollections from '../../hooks/useCollections';

const Collections = () => {

    const collections = useCollections();

    return (
        <SimpleGrid
            columns={{ base: 1, md: 2, "2xl": 3 }}
            spacing={8}
        >
            {
                collections.map(contractAddress => (
                    <Collection
                        key={contractAddress}
                        contractAddress={contractAddress}
                        route={'rent'}
                    />
                ))
            }
        </SimpleGrid>
    )
}

export default Collections