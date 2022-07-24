const contracts = {
    "0x4Ba29ef510B6C622dC00C6C8d0a393Ab4A779fdD": {
        "name": "Collection 1",
        "description": "Lorem ipsum dolor",
        "thumbnailUrl": "/collection_filler.png",
    },
}

export const getCollectionMetadata = (contractAddress: string) => (contracts[contractAddress])

export default contracts;