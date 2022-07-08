import React from 'react'

import { 
    VStack,
    Button,
    SimpleGrid,
    Text,
    Spinner
} from '@chakra-ui/react'

import {default as NFT, OwnedButtons} from '../../../components/card/NFT';

import useLendOwnedNFTs from '../../../hooks/useLendOwnedNFTs';

interface Props {
    contractAddress: string;
}

const Owned : React.FC<Props> = ({ contractAddress }) => {

    const {
        ownedNFTs,
        approved,
        loading,
        approveForAll,
        mintVNFT
    } = useLendOwnedNFTs(contractAddress);


    if(loading){
        return (
            <VStack>
                <Spinner />
            </VStack>
        )
    }
    if(ownedNFTs.length === 0) {
        return (
            <VStack>
                <Text>You don{"'"}t own any NFTs in this collection.</Text>
            </VStack> 
        )
    }
    return (
        <VStack
            spacing={4}
        >
            {
                !approved && (
                    <Button
                        colorScheme='brand'
                        onClick={() => approveForAll()}
                        variant='solid'
                    >
                        Approve for All
                    </Button>
                )
            }
            <SimpleGrid
                columns={{ base: 1, lg: 2, "2xl": 3 }}
                spacing={4}
            >
                {
                    ownedNFTs.map(nft => (
                        <NFT 
                            key={`${nft.contractAddress} ${nft.tokenId}`}
                            token={nft}
                            actionButtons={
                                <OwnedButtons
                                    onStake={() => mintVNFT(nft.tokenId)}
                                />
                            }
                        />
                    ))
                }
            </SimpleGrid>
        </VStack>
    )
}

export default Owned