import React, { useEffect } from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack
  } from '@chakra-ui/react'
import { useSwitchNetwork } from 'wagmi';
import { chains_data } from '../../pages/_app';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const SwitchNetworks : React.FC<Props> = ({ isOpen, onClose }) => {

    const { switchNetwork } = useSwitchNetwork();

    const onClick = (chainId: number) => {
        switchNetwork(chainId);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Switch Networks</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack
                    spacing={4}
                >
                    {
                        chains_data.map((chain) => (
                            <Button
                                key={chain.id}
                                onClick={() => onClick(chain.id)}
                            >
                                {chain.name}
                            </Button>
                        ))
                    }
                </VStack>
            </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default SwitchNetworks