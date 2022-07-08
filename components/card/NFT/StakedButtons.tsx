import React from 'react'

import {
    Button,
    HStack
} from '@chakra-ui/react'

interface Props {
    onClaim: () => void;
    onLend: () => void;
}

const StakedButtons : React.FC<Props> = ({ onClaim, onLend }) => {

    return (
        <HStack>
            <Button
                colorScheme='brand'
                variant='solid'
                onClick={onClaim}
            >
                Claim
            </Button>
            <Button
                colorScheme='brand'
                variant='solid'
                onClick={onLend}
            >
                Lend
            </Button>
        </HStack>
    )
}

export default StakedButtons