import React from 'react'

import { 
    HStack,
    Button
} from '@chakra-ui/react'

import { Token } from '../../../hooks/types';
import RentButton from './BidButton';

interface Props {
    token: Token;
    mode: "owned" | "staked" | "listed";
    disabled?: boolean;
    onClick?: () => void;
}

const ActionButtons : React.FC<Props> = ({ mode, token, disabled, onClick }) => {
  return (
    <HStack
        justifyContent='space-around'
        w="100%"
        spacing={4}
    >
        {getActions(mode, token, onClick, disabled)}
    </HStack>
  )
}

const getActions = (
    mode: "owned" | "staked" | "listed", 
    token: Token,
    onClick = () => {},
    disabled = false,

) => {
    switch(mode) {
        case "owned":
            return (
                <Button
                    disabled={disabled}
                    colorScheme='brand'
                    variant='solid'
                    onClick={onClick}
                >
                    Stake
                </Button>
            )
        case "staked":
            return (
                <>
                    <Button
                        colorScheme='brand'
                        variant='solid'
                    >
                        Claim
                    </Button>
                    <Button
                        colorScheme='brand'
                        variant='solid'
                    >
                        List
                    </Button>
                </>
            )
        case "listed":
            return (
                <RentButton
                    token={token}
                />
            )
    }
}


export default ActionButtons