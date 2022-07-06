// Chakra imports
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
// Custom components
import Card from "./Card";
// Assets
import React from "react";

import { Token } from "../../hooks/types";

interface Props {
  token: Token;
}

const NFT : React.FC<Props> = ({ token }) => {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  return (
    <Card p='20px'>
      <VStack 
        spacing={4}
        h='100%'
      >
        <Image
          alt="NFT image"
          src={token.image}
          w={{ base: "100%", "3xl": "100%" }}
          h={{ base: "100%", "3xl": "100%" }}
          borderRadius='20px'
        />
        <Flex flexDirection='column' justify='space-between' h='100%'>
          <Flex
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb='auto'
          >
            <Flex direction='column'>
              <Text
                color={textColor}
                fontSize={{
                  base: "xl",
                  md: "lg",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "md",
                  "3xl": "lg",
                }}
                mb='5px'
                fontWeight='bold'
                me='14px'>
                {token.name}
              </Text>
            </Flex>
          </Flex>
          <Flex
            align='start'
            justify='space-between'
            alignItems='center'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            gap={2}
          >
            <Text fontWeight='700' fontSize='sm' color={textColorBid}>
              Rate: ${token.rate} / hour
            </Text>
            <Link
              href={`/collections/${token.contractAddress}/${token.tokenId}`}
            >
              <Button
                variant='darkBrand'
                color='white'
                fontSize='sm'
                fontWeight='500'
                borderRadius='70px'
                px='24px'
                py='5px'
              >
                Rent
              </Button>
            </Link>
          </Flex>
        </Flex>
      </VStack>
    </Card>
  );
}

export default NFT;