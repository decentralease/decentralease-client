import React from 'react'

import { useRouter } from 'next/router'

import Collection from '../../views/marketplace/Collection';

const CollectionPage = () => {

    const { query } = useRouter();
    const { pid } = query;

    return (
        <Collection 
            contractAddress={pid as string}
        />
    )
}

export default CollectionPage