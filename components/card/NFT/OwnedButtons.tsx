import React from 'react'

import {
    Button,
    HStack
} from '@chakra-ui/react'

interface Props {
    onStake: () => void;
    openModal: () => void;
}

const OwnedButtons : React.FC<Props> = ({ onStake, openModal }) => {

    return (
        <HStack>
            <Button
                colorScheme='brand'
                variant='solid'
                onClick={onStake}
            >
                Stake
            </Button>
            <Button
                colorScheme='brand'
                variant='solid'
                onClick={openModal}
            >
                Stake and List
            </Button>
        </HStack>
    )
}

export default OwnedButtons