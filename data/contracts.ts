const bittorrent_contracts = {
    "0x1dD7b0dE9271f6C1e43A02A0917Afd58Be338cFe": {
        "name": "Decentraland",
        "description": "Decentraland is a blockchain-powered virtual world, developed and owned by its users, who can create, experience, and monetize content and applications. Join a growing community of virtual world inhabitants who are building the world's largest alternate reality economy on the blockchain. In this store, you can buy and sell land assets in MANA, DCL's native currency.",
        "thumbnailUrl": "https://gateway.pinata.cloud/ipfs/QmQGRHYnYF6gGSrAvou945hcVi2nygTar6U6hwPuC2vyfi",
    },
    "0xfd5B40118C3992FA5DB51dF1258504a5022f59b6": {
        "name": "Axie Infinity",
        "description": "Axies are fierce creatures that love to battle, build, and hunt for treasure! Build up a collection and use them across an ever-expanding universe of games!",
        "thumbnailUrl": "https://gateway.pinata.cloud/ipfs/Qmaei23MhMVJE64EtRu8TgCp9Fw2J8SVCh5bnLUWKozggw",
    }
}

const mumbai_contracts = {
    "0x87F04fdD32c20608ef4E8Ab7458dA30A124058bd": {
        "name": "Decentraland",
        "description": "Decentraland is a blockchain-powered virtual world, developed and owned by its users, who can create, experience, and monetize content and applications. Join a growing community of virtual world inhabitants who are building the world's largest alternate reality economy on the blockchain. In this store, you can buy and sell land assets in MANA, DCL's native currency.",
        "thumbnailUrl": "https://gateway.pinata.cloud/ipfs/QmQGRHYnYF6gGSrAvou945hcVi2nygTar6U6hwPuC2vyfi",
    },
    "0x4640298e8058302C0AdD91a7C603c236F88ceD89": {
        "name": "Axie Infinity",
        "description": "Axies are fierce creatures that love to battle, build, and hunt for treasure! Build up a collection and use them across an ever-expanding universe of games!",
        "thumbnailUrl": "https://gateway.pinata.cloud/ipfs/Qmaei23MhMVJE64EtRu8TgCp9Fw2J8SVCh5bnLUWKozggw",
    }
}

const collections = {
    80001: mumbai_contracts,
    199: bittorrent_contracts
}

export const getCollections = (chainId : number) => (Object.keys(collections[chainId] || []));

export const getCollectionMetadata = (chainId : number, contractAddress: string) => ((collections[chainId] || {})[contractAddress]);

export default bittorrent_contracts;