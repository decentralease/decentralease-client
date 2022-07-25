import React, { useState } from 'react'

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
    useColorModeValue,

} from '@chakra-ui/react'

import useRentModal from '../../hooks/useRentModal';


import { Token } from '../../hooks/types'
import Success from './Success';
import Loading from './Loading';

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
        fulfillLoading,
        fulfillSuccess,
    } = useRentModal(token.contractAddress, token.tokenId);

    const maxDuration = moment.unix(rentDetails.maxEndTime).diff(moment(), 'days');

    const onSubmit = async () => {
        await rent();
    }

    const textColor = useColorModeValue('secondaryGray.900', '#fff');

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
                    {
                        fulfillSuccess ? (
                            <Success />
                        ) : (
                            fulfillLoading ? (
                                <Loading />
                            ) : (
                                <>
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
                                            alignItems={{base: 'center', md: 'flex-start'}}
                                            gap={4}
                                            justifyContent='center'
                                        >
                                            <Heading>
                                                Rental Agreement
                                            </Heading>
                                            <VStack
                                                alignItems={{base: 'center', md: 'flex-start'}}
                                                spacing={2}
                                                w='100%'
                                            >
                                                <Text>
                                                    Price: {rentDetails.price} BTT / day
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
                                                        step={1}
                                                        precision={3}
                                                        maxW='100px' 
                                                        mr='2rem' 
                                                        value={duration} 
                                                        onChange={(_, valueAsNumber) => setDuration(valueAsNumber)}
                                                    >
                                                        <NumberInputField 
                                                            color={textColor}
                                                        />
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
                                            <Text
                                                textAlign={{base: 'center', md: 'left'}}
                                            >
                                                You are renting this NFT for {duration} days for a total price of {(duration * parseFloat(rentDetails.price)).toFixed(3)} BTT.
                                            </Text>
                                            <Button
                                                variant='solid'
                                                colorScheme='brand'
                                                onClick={onSubmit}
                                            >
                                                Rent
                                            </Button>
                                        </VStack>
                                    </SimpleGrid>
                                </>
                            )
                        )

                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default RentModal