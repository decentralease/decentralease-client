import React from 'react'

import { useRouter } from 'next/router'

import Collection from '../../../views/lend/Collection';

const CollectionPage = () => {

    const { query } = useRouter();
    const { contractAddress } = query;

    return (
        <Collection 
            contractAddress={contractAddress as string}
        />
    )
}

export default CollectionPage