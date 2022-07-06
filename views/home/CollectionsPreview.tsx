import React from 'react'

import {
    SimpleGrid
} from '@chakra-ui/react';

import Collection from '../../components/card/Collection';

import useCollections from '../../hooks/useCollections';

const CollectionsPreview = () => {

    const collections = useCollections();

    return (
        <SimpleGrid
            columns={{ base: 2, lg: 3 }}
            spacing={8}
        >
            {
                collections.map(collection => (
                    <Collection
                        key={collection.contractAddress}
                        collection={collection}
                    />
                ))
            }
        </SimpleGrid>
    )
}

export default CollectionsPreview