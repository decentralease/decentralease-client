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
import useCollectionDetails from "../../hooks/useCollectionDetails";

interface Props {
    contractAddress: string;
    chain? : string;
    route: string;
}
  
const Collection : React.FC<Props> = ({ contractAddress, route, chain = 'ethereum' }) => {

    const { collection, loading } = useCollectionDetails(contractAddress, chain)

    const textColor = useColorModeValue("navy.700", "white");

    if(loading || !collection) {
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
              alt="Collecion Image"
              src={collection.thumbnailUrl}
              h='150px'
              borderRadius='20px'
            />
            <VStack>
              <Text
                color={textColor}
                fontWeight='bold'
                fontSize='xl'
                textAlign='center'
              >
                {collection.name}
              </Text>
              <Text
                color='secondaryGray.600'
                fontWeight='400'
                textAlign='center'
              >
                {collection.description && collection.description.slice(0, 100)}...
              </Text>
            </VStack>
            <Flex
              direction='column'
              flex={1}
              justify='flex-end'
            >
              <Link
                href={`${route}/${collection.contractAddress}`}
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