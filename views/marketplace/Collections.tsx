import { SimpleGrid } from '@chakra-ui/react';
import React from 'react'
import Collection from '../../components/card/Collection';

const collections = [
    "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
    "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
]

const Collections = () => {

    return (
        <SimpleGrid
            columns={{ base: 2, lg: 3 }}
            spacing={8}
        >
            {
                collections.map(contractAddress => (
                    <Collection
                        key={contractAddress}
                        contractAddress={contractAddress}
                    />
                ))
            }
        </SimpleGrid>
    )
}

export default Collections