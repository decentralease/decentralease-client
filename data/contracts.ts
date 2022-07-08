const contracts = [
    // {
    //     contractAddress: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
    //     chain: 'ethereum',
    // },
    // {
    //     contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    //     chain: 'ethereum',
    // },
    {
        contractAddress: process.env.NEXT_PUBLIC_DO_NFT_ADDRESS,
        chain: 'mumbai',
    }
]

export default contracts;