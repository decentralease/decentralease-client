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
    Skeleton
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
  
const Collection : React.FC<Props> = ({ contractAddress, route}) => {

    const { collection, loading } = useCollectionDetails(contractAddress)

    const textColor = useColorModeValue("navy.700", "white");

    return (
      <Skeleton 
        isLoaded={!loading && !!(collection)}
        w="100%"
        borderRadius='20px'
      >
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
              src={collection && collection.thumbnailUrl}
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
                {collection && collection.name}
              </Text>
              <Text
                color='secondaryGray.600'
                fontWeight='400'
                textAlign='center'
              >
                {collection && collection.description.slice(0, 100)}...
              </Text>
            </VStack>
            <Flex
              direction='column'
              flex={1}
              justify='flex-end'
            >
              <Link
                href={`${route}/${contractAddress}`}
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
      </Skeleton>
    );
  }
  
export default Collection;