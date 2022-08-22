const markets = {
    80001: "0xAC030BC377180124d703922ea3aCfE610Cdf2E0d",
    199: "0x53bAbd64BB5f48F82A5084fef0AaDd2D9FD393b2"
}

export const getMarket = (chainId : number) => (markets[chainId]);

export default markets;