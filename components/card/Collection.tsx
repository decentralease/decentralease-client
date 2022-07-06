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
import { Collection } from "../../hooks/types";

interface Props {
    collection: Collection
}
  
const Collection : React.FC<Props> = ({ collection }) => {
    const textColor = useColorModeValue("navy.700", "white");
    return (
      <Card 
        p='1rem'
        h='100%'
      >
        <VStack
          spacing={4}
          h='100%'
        >
          <Image
            alt="NFT image"
            src={collection.image}
            w='100%'
            borderRadius='20px'
          />
          <VStack
            alignItems='flex-start'
          >
            <Text
              color={textColor}
              fontWeight='bold'
              fontSize='xl'
            >
              {collection.title}
            </Text>
            <Text
              color='secondaryGray.600'
              fontWeight='400'
            >
              {collection.description}
            </Text>
          </VStack>
          <Flex
            direction='column'
            flex={1}
            justify='flex-end'
          >
            <Link
              href={`collections/${collection.contractAddress}`}
            >
              <Button
                variant='darkBrand'
                color='white'
                fontSize='sm'
                h="40px"
                borderRadius='20px'
              >
                View
              </Button>
            </Link>
          </Flex>
        </VStack>
      </Card>
    );
  }
  
export default Collection;