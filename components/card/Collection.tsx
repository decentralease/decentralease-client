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
import useCollection from "../../hooks/useCollection";

interface Props {
    contractAddress: string
}
  
const Collection : React.FC<Props> = ({ contractAddress }) => {

    const { collection, loading } = useCollection(contractAddress)

    const textColor = useColorModeValue("navy.700", "white");

    if(loading) {
      return null;
    } else {
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
              src={collection.bannerUrl}
              w='100%'
              h='150px'
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
                {collection.name}
              </Text>
              <Text
                color='secondaryGray.600'
                fontWeight='400'
              >
                {collection.description.slice(0, 100)}...
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
  }
  
export default Collection;