// Chakra imports
import {
  VStack,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "../Card";
// Assets
import React from "react";

import { Token } from "../../../hooks/types";

interface Props {
  token: Token;
  actionButtons?: React.ReactNode;
}

const NFT : React.FC<Props> = ({ token, actionButtons }) => {
  const textColor = useColorModeValue("navy.700", "white");
  return (
    <Card p='20px'>
      <VStack 
        spacing={4}
        h='100%'
      >
        <Image
          alt="NFT image"
          src={token.image}
          w="100%"
          h="100%"
          borderRadius='20px'
        />
        <VStack 
          justify='space-between'
          h='100%'
          spacing={4}
        >
          <Text
            color={textColor}
            fontSize={{
              md: "lg",
              "2xl": "xl",
            }}
            fontWeight='bold'
          >
            {token.name}
          </Text>
          {actionButtons}
        </VStack>
      </VStack>
    </Card>
  );
}

export { default as OwnedButtons } from "./OwnedButtons";
export { default as StakedButtons } from './StakedButtons';
export { default as ListedButtons } from './ListedButtons';

export default NFT;