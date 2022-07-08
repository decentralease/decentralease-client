import { Collection, Token } from "../hooks/types";
import { getLink } from "./ipfs";

const options = {
    "method": "GET",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": process.env.NEXT_PUBLIC_NFTPORT_API_KEY
    }
}

export const getCollectionDetails = async (contractAddress : string, chain = 'ethereum') : Promise<Collection> => {
    const data = await fetch(`https://api.nftport.xyz/v0/nfts/${contractAddress}?chain=${chain}`, options)
        .then(response => response.json())
        .catch(err => err);
    if(data.contract){
        return transformCollectionResponse({...data.contract, contractAddress});
    }
}

export const getOwnedNFTs = async (address : string, chain = 'ethereum') : Promise<Token[]> => {
    const data = await fetch(`https://api.nftport.xyz/v0/accounts/${address}?chain=${chain}&include=metadata`, options)
        .then(response => response.json())
        .catch(err => err);
    return data.nfts.filter(nft => (nft.name || nft.file_url)).map(nft => transformTokenResponse(nft));
}

export const getOwnedNFTsFromCollection = async (address : string, contractAddress : string, chain = 'ethereum') => {
    const data = await fetch(`https://api.nftport.xyz/v0/accounts/${address}?chain=${chain}&contract_address=${contractAddress}`, options)
      .then(response => response.json())
      .catch(err => err);
    if(data.nfts){
        return data.nfts.map(nft => transformCollectionResponse(nft));
    }
}

export const getTokenDetails = async (contractAddress : string, tokenId : string, chain = 'ethereum') : Promise<Token> => {
    const tokenData = await fetch(`https://api.nftport.xyz/v0/nfts/${contractAddress}/${tokenId}?chain=${chain}`, options)
        .then(response => response.json())
        .catch(err => err);
    if(tokenData.nft) {
        return transformTokenResponse(tokenData.nft);
    }
}

const transformTokenResponse = (tokenResponse : any) : Token => ({
    contractAddress: tokenResponse.contract_address,
    tokenId: tokenResponse.token_id,
    image: getLink(tokenResponse.cached_file_url || tokenResponse.metadata.image),
    rate: 1,
    name: (tokenResponse.name || tokenResponse.metadata.name),
})

const transformCollectionResponse = (collectionResponse : any) : Collection => ({
    contractAddress: collectionResponse.contractAddress,
    name: collectionResponse.name,
    description: collectionResponse.metadata.description,
    thumbnailUrl: collectionResponse.metadata.thumbnail_url,
    bannerUrl: collectionResponse.metadata.banner_url
})
