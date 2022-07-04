export interface Collection {
    contractAddress: string;
    title: string;
    description: string;
    image: string;
}

export interface Token {
    contractAddress: string;
    tokenId: string;
    image: string;
    rate: number;
}