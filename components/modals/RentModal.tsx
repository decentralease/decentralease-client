import React from 'react'

import moment from 'moment';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack,
    SimpleGrid,
    Image,
    Heading,
    Text,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Flex,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,

} from '@chakra-ui/react'

import useRentModal from '../../hooks/useRentModal';


import { Token } from '../../hooks/types'

interface Props {
    token: Token;
    isOpen: boolean;
    onClose: () => void;
}

const RentModal : React.FC<Props> = ({ isOpen, onClose, token }) => {

    const { 
        duration, 
        setDuration,
        rentDetails,
        rent,
    } = useRentModal(token.contractAddress, token.tokenId);

    const maxDuration = moment.unix(rentDetails.maxEndTime).diff(moment(), 'days');

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            size={{ base: '4xl' }}
        >
            <ModalOverlay />
            <ModalContent
                borderRadius={'20px'}
                p={'2rem'}
            >
                <ModalCloseButton />
                <ModalBody
                    p={0}
                >
                    <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        spacing={8}
                        w={'100%'}
                    >
                        <VStack
                            flexDirection='column'
                            spacing={4}
                        >
                            <Image
                                alt="NFT image"
                                src={token.image}
                                w='100%'
                                h='100%'
                                borderRadius='20px'
                            />
                            <Heading
                                size={'lg'}
                            >
                                {token.name}
                            </Heading>
                        </VStack>
                        <VStack
                            alignItems='flex-start'
                            gap={4}
                        >
                            <Heading>
                                Rental Agreement
                            </Heading>
                            <VStack
                                alignItems='flex-start'
                                spacing={2}
                                w='100%'
                            >
                                <Text>
                                    Price: {rentDetails.price} MATIC / day
                                </Text>
                                <Text>
                                    Max Duration: {maxDuration} days
                                </Text>
                                <Flex
                                    w={"100%"}
                                >
                                    <NumberInput 
                                        placeholder="Duration"
                                        min={0}
                                        max={maxDuration}
                                        step={0.001}
                                        precision={3}
                                        maxW='100px' 
                                        mr='2rem' 
                                        value={duration} 
                                        onChange={(_, valueAsNumber) => setDuration(valueAsNumber)}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <Slider
                                        min={0}
                                        max={maxDuration}
                                        step={1}
                                        flex={1}
                                        focusThumbOnChange={false}
                                        value={duration}
                                        onChange={setDuration}
                                    >
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                            </SliderTrack>
                                        <SliderThumb fontSize='sm' boxSize='32px' />
                                    </Slider>
                                </Flex>
                            </VStack>
                            <Text>
                                You are renting this NFT for <span>{duration.toFixed(3)}</span> days for a total price of {(duration * rentDetails.price).toFixed(3)} MATIC.
                            </Text>
                            <Button
                                variant='solid'
                                colorScheme='brand'
                                onClick={() => rent()}
                            >
                                Rent
                            </Button>
                        </VStack>
                    </SimpleGrid>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default RentModal