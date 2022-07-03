import React from 'react';

import {
    Flex,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue
} from "@chakra-ui/react";  
import useWallet from '../../hooks/useWallet';
import { getEllipsisTxt } from '../../services/formatter';

const WalletConnect = () => {

    const {
        address,
        connect,
        disconnect,
    } = useWallet();

    let menuBg = useColorModeValue("white", "navy.800");
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
    const shadow = useColorModeValue(
      "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
      "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
    );  

    return (
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
                <MenuItem
                    _hover={{ bg: "none" }}
                    _focus={{ bg: "none" }}
                    color={address ? 'red.400' : 'purple.400'}
                    borderRadius='8px'
                    px='14px'
                    onClick={
                        address
                            ? () => disconnect()
                            : () => connect()
                    }
                >
                    <Text fontSize='sm'>{
                        address
                            ? "Disconnect"
                            : "Connect"
                    }</Text>
                </MenuItem>
            </Flex>
        </MenuList>
    )
}

export default WalletConnect