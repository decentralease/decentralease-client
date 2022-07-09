import React from 'react'

import { 
    VStack,
    SimpleGrid,
    Text,
    Spinner,
    useDisclosure
} from '@chakra-ui/react'

import {default as NFT, ListedButtons} from '../../../../components/card/NFT';
import RentModal from '../../../../components/modals/RentModal';

import useRentCollection from '../../../../hooks/useRentCollection';
import AvailableInfo from './AvailableInfo';

interface Props {
    contractAddress: string;
}

const Available : React.FC<Props> = ({ contractAddress }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { tokensForRent, loading } = useRentCollection(contractAddress);

    const [selectedTokenIndex, setSelectedTokenIndex] = React.useState<number>(0);

    const openModal = (index: number) => {
        setSelectedTokenIndex(index);
        onOpen();
    }

    if(loading){
        return (
            <VStack>
                <Spinner />
            </VStack>
        )
    }
    if(tokensForRent.length === 0) {
        return (
            <VStack>
                <Text>No tokens available for rent.</Text>
            </VStack> 
        )
    }
    return (
        <>
            {
                tokensForRent.length > 0 && (
                    <RentModal 
                        token={tokensForRent[selectedTokenIndex]}
                        isOpen={isOpen}
                        onClose={onClose}
                    />
                )
            }
            <VStack
                spacing={4}
            >
                <SimpleGrid
                    columns={{ base: 1, lg: 2 }}
                    spacing={4}
                >
                    {
                        tokensForRent.map((nft, index) => (
                            <NFT 
                                key={`${nft.contractAddress} ${nft.tokenId}`}
                                token={nft}
                                actionButtons={
                                    <ListedButtons
                                        openModal={() => openModal(index)}
                                    />
                                }
                                infoDisplay={
                                    <AvailableInfo
                                        rate={nft.rate}
                                        maxEndTime={nft.maxEndTime}
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

export default Available