import React from 'react'

import { 
    VStack,
    SimpleGrid,
    Text,
    Spinner,
    useDisclosure
} from '@chakra-ui/react'

import {ActiveButtons, default as NFT} from '../../../components/card/NFT';

import useActiveRentals from '../../../hooks/useActiveRentals';

interface Props {
    contractAddress: string;
}

const Active : React.FC<Props> = ({ contractAddress }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { activeRentals, loading } = useActiveRentals(contractAddress);

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
    if(activeRentals.length === 0) {
        return (
            <VStack>
                <Text>You do not have any active rentals.</Text>
            </VStack> 
        )
    }
    return (
        <VStack
            spacing={4}
        >
            <SimpleGrid
                columns={{ base: 1, lg: 2, "2xl": 3 }}
                spacing={4}
            >
                {
                    activeRentals.map((nft, index) => (
                        <NFT 
                            key={`${nft.contractAddress} ${nft.tokenId}`}
                            token={nft}
                            actionButtons={
                                <ActiveButtons
                                    checkIn={() => {}}
                                />
                            }
                        />
                    ))
                }
            </SimpleGrid>
        </VStack>
    )
}

export default Active