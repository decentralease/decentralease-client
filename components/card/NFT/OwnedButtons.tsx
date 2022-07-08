import React from 'react'

import {
    Button,
    HStack
} from '@chakra-ui/react'

interface Props {
    onStake: () => void;
}

const OwnedButtons : React.FC<Props> = ({ onStake }) => {

    return (
        <HStack>
            <Button
                colorScheme='brand'
                variant='solid'
                onClick={onStake}
            >
                Stake
            </Button>
        </HStack>
    )
}

export default OwnedButtons