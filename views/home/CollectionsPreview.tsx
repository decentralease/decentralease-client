import React from 'react'

import {
    SimpleGrid
} from '@chakra-ui/react';

import Collection from '../../components/card/Collection';

import collections from '../../data/contracts';

const CollectionsPreview = () => {
    return (
        <SimpleGrid
            columns={{base: 1, lg: 2}}
            spacing={8}
        >
            {
                collections.map(collection => (
                    <Collection
                        key={collection.contractAddress}
                        contractAddress={collection.contractAddress}
                        route={'rent'}
                    />
                ))
            }
        </SimpleGrid>
    )
}

export default CollectionsPreview