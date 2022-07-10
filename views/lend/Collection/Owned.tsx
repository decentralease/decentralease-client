import React, { useState } from 'react'

import { 
    VStack,
    Button,
    SimpleGrid,
    Text,
    Spinner,
    useDisclosure
} from '@chakra-ui/react'

import {default as NFT, OwnedButtons} from '../../../components/card/NFT';

import useLendOwnedNFTs from '../../../hooks/useLendOwnedNFTs';
import LendModal from '../../../components/modals/LendModal';

interface Props {
    contractAddress: string;
}

const Owned : React.FC<Props> = ({ contractAddress }) => {

    const {
        walletConnected,
        ownedNFTs,
        approved,
        loading,
        approveForAll,
        mintVNFT,
        stakeAndCreateSigma
    } = useLendOwnedNFTs(contractAddress);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0);

    const openModal = (index: number) => {
        onOpen();
        setSelectedTokenIndex(index);
    }

    const onLend = async (
        maxEndTime: moment.Moment,
        pricesPerDay: number[],
        durations: number[]
    ) => {
        return stakeAndCreateSigma(
            ownedNFTs[selectedTokenIndex].tokenId,
            maxEndTime,
            pricesPerDay,
            durations
        )
    }

    if(!walletConnected){
        return (
            <VStack>
                <Text>
                    Connect your Wallet
                </Text>
            </VStack>
        );
    }
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
        <>
            <LendModal
                isOpen={isOpen}
                onClose={onClose}
                token={ownedNFTs[selectedTokenIndex]}
                onLend={onLend}
            />
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
                    columns={{ base: 1, lg: 2 }}
                    spacing={4}
                >
                    {
                        ownedNFTs.map((nft, index) => (
                            <NFT 
                                key={`${nft.contractAddress} ${nft.tokenId}`}
                                token={nft}
                                actionButtons={
                                    <OwnedButtons
                                        onStake={() => mintVNFT(nft.tokenId)}
                                        openModal={() => openModal(index)}
                                    />
                                }
                            />
                        ))
                    }
                </SimpleGrid>
            </VStack>
        </>
    )
}

export default Owned