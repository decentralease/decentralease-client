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
    onLend: (maxEndTime: moment.Moment, minDuration: number, pricePerDay: number) => void;
}

const LendModal : React.FC<Props> = ({ isOpen, onClose, token, onLend }) => {

    const [availableFor, setAvailableFor] = useState<number>(0);
    const [minDuration, setMinDuration] = useState<number>(0);
    const [pricePerDay, setPricePerDay] = useState<number>(0);

    const onSubmit = () => {
        onLend(
            moment().add(availableFor, 'days'),
            minDuration,
            pricePerDay
        )
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
                        <VStack
                            alignItems={'flex-start'}
                            spacing={1}
                        >
                            <Text>Min. Duration (days)</Text>
                            <NumberInput
                                value={minDuration}
                                onChange={(_, val) => setMinDuration(val)}
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
                            <Text>Price per Day ($MATIC)</Text>
                            <NumberInput
                                value={pricePerDay}
                                onChange={(_, val) => setPricePerDay(val)}
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