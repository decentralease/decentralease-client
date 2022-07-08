import React from 'react'

import {
    Spinner,
    Text,
    Heading,
    Image,
    VStack,
    Container,
    SimpleGrid,
    useDisclosure
} from '@chakra-ui/react';

import useCollectionDetails from '../../hooks/useCollectionDetails';

import { default as NFT, ListedButtons } from '../../components/card/NFT';

import useRentCollection from '../../hooks/useRentCollection';
import RentModal from '../../components/modals/RentModal';

interface Props {
    contractAddress: string;
}

const Collection : React.FC<Props> = ({ contractAddress }) => {

    const { collection, loading } = useCollectionDetails(contractAddress);

    const { tokensForRent } = useRentCollection(contractAddress);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [selectedTokenIndex, setSelectedTokenIndex] = React.useState<number>(0);

    const openModal = (index: number) => {
        setSelectedTokenIndex(index);
        onOpen();
    }

    if(loading) {
        return (
            <VStack>
                <Spinner 
                    size='xl'
                />
                <Text>Loading...</Text>
            </VStack>
        )
    } else {
        return (
            <>
                {tokensForRent.length > 0 && (
                    <RentModal 
                        token={tokensForRent[selectedTokenIndex]}
                        isOpen={isOpen}
                        onClose={onClose}
                    />
                )}
                <Container
                    gap={8}
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    maxW="3xl"
                    py='1rem'
                >
                    <VStack
                        position='relative'
                        mb={'30px'}
                    >
                        <Image
                            alt="Banner Image"
                            src={collection.bannerUrl}
                            maxHeight="200px"
                            borderRadius={'2rem'}
                        />
                        <Image
                            alt="Logo Image"
                            src={collection.thumbnailUrl}
                            position='absolute'
                            height={'60px'}
                            width={'60px'}
                            borderRadius={'50%'}
                            bottom={'-30px'}
                        />
                    </VStack>
                    <VStack
                        alignItems='center'
                    >
                        <Heading>{collection.name}</Heading>
                        <Text
                            textAlign='center'
                        >
                            {collection.description}
                        </Text>
                    </VStack>
                    <SimpleGrid
                        columns={{ base: 1, lg: 2, "2xl": 3 }}
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
                                />
                            ))
                        }
                    </SimpleGrid>
                </Container>
            </>
        )
    }
}

export default Collection