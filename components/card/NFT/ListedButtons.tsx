import React from 'react'

import {
    Button,
    HStack
} from '@chakra-ui/react'

interface Props {
    openModal: () => void;
}

const RentButton : React.FC<Props> = ({ openModal }) => {

    return (
        <HStack>
            <Button
                colorScheme='brand'
                variant='solid'
                onClick={openModal}
            >
                Rent
            </Button>
        </HStack>
    )
}

export default RentButton