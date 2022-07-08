import React from 'react'

import {
    Button,
    useDisclosure
} from '@chakra-ui/react'
import BidModal from '../../modals/RentModal'

import { Token } from '../../../hooks/types'

interface Props {
    token: Token;
}

const RentButton : React.FC<Props> = ({ token }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <BidModal 
                token={token}
                isOpen={isOpen}
                onClose={onClose}
            />
            <Button
                colorScheme='brand'
                variant='solid'
                onClick={onOpen}
            >
                Rent
            </Button>
        </>
    )
}

export default RentButton