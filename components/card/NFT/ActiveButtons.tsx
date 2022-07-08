import React from 'react'

import {
    Button,
    HStack
} from '@chakra-ui/react'

interface Props {
    checkIn: () => void;
}

const ActiveButtons : React.FC<Props> = ({ checkIn }) => {

    return (
        <HStack>
            <Button
                colorScheme='brand'
                variant='solid'
                onClick={checkIn}
            >
                Check In
            </Button>
        </HStack>
    )
}

export default ActiveButtons