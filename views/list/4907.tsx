import React, { useState } from 'react'

import {
    Heading,
    Input,
    VStack,
    Text,
    Button,
    HStack
} from '@chakra-ui/react';

import Card from '../../components/card/Card'

import Copyable from '../../components/utility/Copyable';
import useDoNFTFactory from '../../hooks/use4907List';

const WrapView = () => {

    const [contractAddress, setContractAddress] = useState<string>('');

    const { 
        deployDoNFT, 
        newContractAddress, 
        error 
    } = useDoNFTFactory();

    return (
        <Card
            p='2rem'
        >
            <VStack
                spacing={4}
            >
                <Heading
                    size='lg'
                >
                    List ERC-4907 Contract
                </Heading>
                <Text>
                    ERC-4907 is an extension of ERC-721. 
                    It adds an additional user role which can be granted to addresses, and a time where the role is automatically revoked. 
                    The user role represents permission to use the NFT, but not the ability to transfer it or set users.
                    Enter the address of the ERC-721 contract you want to wrap below:
                </Text>
                <Input
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    placeholder='Contract Address'
                />
                <Button
                    variant='solid'
                    colorScheme='brand'
                    onClick={() => deployDoNFT(contractAddress)}
                    disabled={contractAddress.length === 0}
                >
                    Wrap
                </Button>
                {
                   Boolean(error) && (
                        <Text
                            color='red.500'
                        >
                            Error
                        </Text>
                    )
                }
                {
                    newContractAddress && (
                        <HStack
                            spacing={1}
                            alignItems='center'
                        >
                            <Text
                                color='brand.500'
                                alignItems={'center'}
                            >
                                Contract Wrapped Successfully:
                            </Text>
                            <Copyable
                                copyText={newContractAddress}
                                displayText={newContractAddress}
                                color='brand.500'
                            />
                        </HStack>
                    )
                }
            </VStack>
        </Card>
    )
}

export default WrapView