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
    HStack,
    Heading,
    Text,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'


import { Token } from '../../hooks/types'

interface Props {
    token: Token;
    isOpen: boolean;
    onClose: () => void;
    onLend: (maxEndTime: moment.Moment, durations: number[], pricesPerDay: number[]) => void;
}

const LendModal : React.FC<Props> = ({ isOpen, onClose, token, onLend }) => {

    const [availableFor, setAvailableFor] = useState<number>(0);
    const [durations, setDurations] = useState<number[]>([0]);
    const [pricesPerDay, setPricesPerDay] = useState<number[]>([0]);

    const onSubmit = () => {
        onLend(
            moment().add(availableFor, 'days'),
            pricesPerDay,
            durations,
        )
    }

    const setPricePerDay = (index: number, value: number) => {
        const newPricesPerDay = [...pricesPerDay];
        newPricesPerDay[index] = value;
        setPricesPerDay(newPricesPerDay);
    }

    const setDuration = (index: number, value: number) => {
        const newDurations = [...durations];
        newDurations[index] = value;
        setDurations(newDurations);
    }

    const addBracket = () => {
        const newDurations = [...durations];
        const newPrices = [...pricesPerDay];
        newDurations.push(durations[durations.length - 1]);
        newPrices.push(0);
        setDurations(newDurations);
        setPricesPerDay(newPrices);
    }

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
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
                    <VStack 
                        spacing={8}
                    >
                        <Heading>{token.name}</Heading>
                        <VStack
                            alignItems={'flex-start'}
                            spacing={1}
                        >
                            <Text>Available For (days)</Text>
                            <NumberInput
                                value={availableFor}
                                onChange={(_, val) => setAvailableFor(val)}
                                min={0}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </VStack>
                        <VStack>
                            {
                                durations.map((duration, index) => (
                                    <HStack
                                        key={index}
                                    >
                                        <VStack
                                            alignItems={'flex-start'}
                                            spacing={1}
                                        >
                                            <Text>Duration (days)</Text>
                                            <NumberInput
                                                value={duration}
                                                onChange={(_, val) => setDuration(index, val)}
                                                min={0}
                                                step={1}
                                            >
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </VStack>   
                                        <VStack
                                            alignItems={'flex-start'}
                                            spacing={1}
                                        >
                                            <Text>Price / Day ($MATIC)</Text>
                                            <NumberInput
                                                value={pricesPerDay[index]}
                                                onChange={(_, val) => setPricePerDay(index, val)}
                                                min={0}
                                                step={0.25}
                                            >
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </VStack>
                                    </HStack>
                                ))
                            }
                            <Button
                                onClick={addBracket}
                            >
                                Add Bracket
                            </Button>
                        </VStack>
                        <Button
                            variant='solid'
                            colorScheme='brand'
                            onClick={onSubmit}
                        >
                            Lend
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default LendModal