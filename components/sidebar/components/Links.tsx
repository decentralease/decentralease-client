/* eslint-disable */
import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
// import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";

import routes from "../../../routes";

const SidebarLinks : React.FC = () => {
  //   Chakra color mode
  const router = useRouter();
  let activeColor = useColorModeValue("gray.700", "white");
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return router.asPath === routeName;
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  return <>
    {
      routes.map((route, index) => {
        return (
          <Link 
            key={index}
            href={route.path}
          >
            <Box
              cursor={'pointer'}
            >
              <HStack
                py='5px'
                ps='10px'
              >
                <Flex
                  w='100%' 
                  alignItems='center' 
                  justifyContent='center'
                >
                  <Box
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeIcon
                        : textColor
                    }
                    me='18px'
                    display='flex'
                  >
                    {route.icon}
                  </Box>
                  <Text
                    me='auto'
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : textColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase())
                        ? "bold"
                        : "normal"
                    }>
                    {route.name}
                  </Text>
                </Flex>
                <Box
                  h='36px'
                  w='4px'
                  bg={
                    activeRoute(route.path.toLowerCase())
                      ? brandColor
                      : "transparent"
                  }
                  borderRadius='5px'
                />
              </HStack>
            </Box>
          </Link>
        );
      })
    }
  </>
}

export default SidebarLinks;
