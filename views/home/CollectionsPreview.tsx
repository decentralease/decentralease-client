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
            columns={{base: 1, lg: 2}}
            spacing={8}
            w='100%'
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

export default CollectionsPreview