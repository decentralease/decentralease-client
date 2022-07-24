import React from 'react';

import {
    Avatar,
    Flex,
    Menu,
    MenuItem,
    MenuButton,
    MenuList,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import useWallet from '../../hooks/useWallet';
import { getEllipsisTxt } from '../../services/formatter';

const WalletConnect = () => {

    const {
        address,
        connectCoinbaseWallet,
        connectMetamaskWallet,
    } = useWallet();

    let menuBg = useColorModeValue("white", "navy.800");
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
    const shadow = useColorModeValue(
      "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
      "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
    );  

    return (
        <Menu>
            <MenuButton p='0px'>
            <Avatar
                _hover={{ cursor: "pointer" }}
                color='white'
                bg={address ? 'brand.400' : 'gray.400'}
                size='sm'
                w='40px'
                h='40px'
                icon={
                    <MdOutlineAccountBalanceWallet 
                        size={20}
                    />
                }
            />
            </MenuButton>
            <MenuList
                boxShadow={shadow}
                p='0px'
                mt='10px'
                borderRadius='20px'
                bg={menuBg}
                border='none'
            >
                <Flex w='100%' mb='0px'>
                    <Text
                        ps='20px'
                        pt='16px'
                        pb='10px'
                        w='100%'
                        borderBottom='1px solid'
                        borderColor={borderColor}
                        fontSize='sm'
                        fontWeight='700'
                        color={textColor}
                    >
                        {address ? `Connected: ${getEllipsisTxt(address, 4)}` : "Not Connected"}
                    </Text>
                </Flex>
                <Flex flexDirection='column' p='10px'>
                    {
                        address ? (
                            <Text fontSize='sm'>
                                Connected: {getEllipsisTxt(address, 4)}
                            </Text>
                        ) : (
                            <>
                                <MenuItem
                                    _hover={{ bg: "none" }}
                                    _focus={{ bg: "none" }}
                                    color={'blue.400'}
                                    borderRadius='8px'
                                    px='14px'
                                    onClick={() => connectCoinbaseWallet()}
                                >
                                    <Text fontSize='sm'>
                                        Connect Coinbase Wallet
                                    </Text>
                                </MenuItem>
                                <MenuItem
                                    _hover={{ bg: "none" }}
                                    _focus={{ bg: "none" }}
                                    color={'orange.400'}
                                    borderRadius='8px'
                                    px='14px'
                                    onClick={() => connectMetamaskWallet()}
                                >
                                    <Text fontSize='sm'>
                                        Connect Metamask
                                    </Text>
                                </MenuItem>
                            </>
                        )
                    }
                </Flex>
            </MenuList>
        </Menu>
    )
}

export default WalletConnect