import React from 'react'

import {
    Box,
    SimpleGrid,
    GridItem,
    Heading,
    Text,
    Textarea,
    FormHelperText,
    FormControl,
    FormLabel,
    Input,
    Stack,
    InputGroup,
    InputLeftAddon,
    Flex,
    VisuallyHidden,
    Button,
    Avatar,
    Icon,
    chakra,
} from '@chakra-ui/react';

import { FaUser } from 'react-icons/fa';
import Card from '../../components/card/Card';

const ScratchForm = () => {
  return (
    <Card>
        <chakra.form
            method="POST"
            rounded={[null, "md"]}
            overflow={{
                sm: "hidden",
            }}
        >
            <Stack
                px={4}
                py={5}
                spacing={6}
                p={{
                    sm: 6,
                }}
            >
                <FormControl>
                    <FormLabel
                        fontSize="md"
                        fontWeight="md"
                    >
                        Name
                    </FormLabel>
                    <Input
                        focusBorderColor="brand.400"
                        rounded="md"
                    />
                </FormControl>
                <FormControl id="symbol" mt={1}>
                    <FormLabel
                        fontSize="md"
                        fontWeight="md"
                    >
                        Symbol
                    </FormLabel>
                    <Input
                        focusBorderColor="brand.400"
                        rounded="md"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                        color: "gray.50",
                        }}
                    >
                        Cover photo
                    </FormLabel>
                    <Flex
                        mt={1}
                        justify="center"
                        px={6}
                        pt={5}
                        pb={6}
                        borderWidth={2}
                        _dark={{
                        color: "gray.500",
                        }}
                        borderStyle="dashed"
                        rounded="md"
                    >
                        <Stack spacing={1} textAlign="center">
                        <Icon
                            mx="auto"
                            boxSize={12}
                            color="gray.400"
                            _dark={{
                            color: "gray.500",
                            }}
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            />
                        </Icon>
                        <Flex
                            fontSize="sm"
                            color="gray.600"
                            _dark={{
                            color: "gray.400",
                            }}
                            alignItems="baseline"
                        >
                            <chakra.label
                            htmlFor="file-upload"
                            cursor="pointer"
                            rounded="md"
                            fontSize="md"
                            color="brand.600"
                            _dark={{
                                color: "brand.200",
                            }}
                            pos="relative"
                            _hover={{
                                color: "brand.400",
                                _dark: {
                                color: "brand.300",
                                },
                            }}
                            >
                            <span>Upload a file</span>
                            <VisuallyHidden>
                                <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                />
                            </VisuallyHidden>
                            </chakra.label>
                            <Text pl={1}>or drag and drop</Text>
                        </Flex>
                        <Text
                            fontSize="xs"
                            color="gray.500"
                            _dark={{
                            color: "gray.50",
                            }}
                        >
                            PNG, JPG, GIF up to 10MB
                        </Text>
                        </Stack>
                    </Flex>
                </FormControl>
            </Stack>
            <Box
                px={{
                    base: 4,
                    sm: 6,
                }}
                py={3}
                textAlign="right"
            >
                <Button
                    type="submit"
                    colorScheme="brand"
                    fontWeight="bold"
                >
                    Save
                </Button>
            </Box>
        </chakra.form>
    </Card>
  )
}

export default ScratchForm