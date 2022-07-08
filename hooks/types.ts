export interface Collection {
    contractAddress: string;
    name: string;
    description: string;
    thumbnailUrl: string;
    bannerUrl: string;
}

export interface Token {
    contractAddress: string;
    tokenId: number;
    image: string;
    rate: number;
    name: string;
}