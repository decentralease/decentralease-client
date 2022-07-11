import { SimpleGrid } from '@chakra-ui/react';
import React from 'react'
import Collection from '../../components/card/Collection';

import collections from '../../data/contracts';

const Collections = () => {

    return (
        <SimpleGrid
            columns={{ base: 1, md: 2, "2xl": 3 }}
            spacing={8}
        >
            {
                collections.map(collection => (
                    <Collection
                        key={collection.contractAddress}
                        contractAddress={collection.contractAddress}
                        chain={collection.chain}
                        route={'lend'}
                    />
                ))
            }
        </SimpleGrid>
    )
}

export default Collections