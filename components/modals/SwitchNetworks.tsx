import React from 'react'

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
import { useNetwork, useSwitchNetwork } from 'wagmi';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const SwitchNetworks : React.FC<Props> = ({ isOpen, onClose }) => {

    const { chains } = useNetwork();
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
                        chains.map((chain) => (
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