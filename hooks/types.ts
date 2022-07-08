export interface Collection {
    contractAddress: string;
    name: string;
    description: string;
    thumbnailUrl: string;
}

export interface Token {
    contractAddress: string;
    tokenId: number;
    image: string;
    name: string;
}