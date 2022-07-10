import React from 'react'

import { 
    VStack,
    SimpleGrid,
    Text,
    useDisclosure
} from '@chakra-ui/react'

import {default as NFT, StakedButtons} from '../../../components/card/NFT';
import LendModal from '../../../components/modals/LendModal';

import useStakedNFTs from '../../../hooks/useStakedNFTs';
import moment from 'moment';

interface Props {
    contractAddress: string;
}

const Staked : React.FC<Props> = ({ contractAddress }) => {

    const {
        walletConnected,
        stakedNFTs,
        createSigma,
        redeemVNFT
    } = useStakedNFTs(contractAddress);

    const [selectedTokenIndex, setSelectedTokenIndex] = React.useState<number>(0);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const onLend = (
        maxEndTime: moment.Moment,
        pricesPerDay: number[],
        durations: number[]
    ) => {
        createSigma(
            stakedNFTs[selectedTokenIndex].tokenId,
            maxEndTime,
            pricesPerDay,
            durations
        )
    }

    const onModalOpen = (index: number) => {
        setSelectedTokenIndex(index);
        onOpen();
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
    if(stakedNFTs.length === 0) {
        return (
            <VStack>
                <Text>You don{"'"}t have any staked NFTs in this collection.</Text>
            </VStack> 
        )
    }
    return (
        <>
            <LendModal 
                isOpen={isOpen}
                onClose={onClose}
                token={stakedNFTs[0]}
                onLend={onLend}
            />
            <VStack
                spacing={4}
            >
                <SimpleGrid
                    columns={{ base: 1, lg: 2 }}
                    spacing={4}
                >
                    {
                        stakedNFTs.map((nft, index) => (
                            <NFT 
                                key={`${nft.contractAddress} ${nft.tokenId}`}
                                token={nft}
                                actionButtons={
                                    <StakedButtons
                                        onClaim={() => redeemVNFT(nft.tokenId)}
                                        onLend={() => onModalOpen(index)}
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

export default Staked