// Chakra imports
import {
    Box,
    Button,
    Flex,
    Image,
    Link,
    Text,
    useColorModeValue,
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
      <Card p='20px'>
        <Flex direction={{ base: "column" }} justify='center'>
          <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
            <Image
              alt="NFT image"
              src={collection.image}
              w={{ base: "100%", "3xl": "100%" }}
              h={{ base: "100%", "3xl": "100%" }}
              borderRadius='20px'
            />
          </Box>
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
              mb='auto'>
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
                  {collection.title}
                </Text>
                <Text
                  color='secondaryGray.600'
                  fontSize={{
                    base: "sm",
                  }}
                  fontWeight='400'
                  me='14px'>
                  {collection.description}
                </Text>
              </Flex>
            </Flex>
            <Flex
              align='start'
              justify='space-between'
              direction={{
                base: "row",
                md: "column",
                lg: "row",
                xl: "column",
                "2xl": "row",
              }}
              mt='25px'>
              <Link
                href={`collections/${collection.contractAddress}`}
                mt={{
                  base: "0px",
                  md: "10px",
                  lg: "0px",
                  xl: "10px",
                  "2xl": "0px",
                }}>
                    <Button
                        variant='darkBrand'
                        color='white'
                        fontSize='sm'
                        fontWeight='500'
                        borderRadius='70px'
                        px='24px'
                        py='5px'
                    >
                        View
                    </Button>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    );
  }
  
export default Collection;