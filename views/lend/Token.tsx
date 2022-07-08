import React, { useState } from 'react'

import { 
    Heading, 
    Image, 
    SimpleGrid, 
    Text,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Flex,
    Button,
    HStack,
    Container,
} from '@chakra-ui/react'

import Card from '../../components/card/Card'

import useToken from '../../hooks/useToken'

interface Props {
    contractAddress: string;
    tokenId: string;
}

const Token : React.FC<Props> = ({ contractAddress, tokenId }) => {

    const token = useToken(contractAddress, tokenId);

    const price = 7;
    const maxDuration = 10;

    const [duration, setDuration] = useState<number>(0);

    if(token) {
        return (
            <Container
                maxW={'4xl'}
                display='flex'
                flexDirection='column'
                gap={4}
            >
                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={4}
                    w={'100%'}
                >
                    <Card
                        display='flex'
                        flexDirection='column'
                        gap={4}
                    >
                        <Image
                            alt="NFT image"
                            src={token.image}
                            w={{ base: "100%", "3xl": "100%" }}
                            h={{ base: "100%", "3xl": "100%" }}
                            borderRadius='20px'
                        />
                        <Heading>
                            {token.name}
                        </Heading>
                    </Card>
                    <Card
                        p={4}
                        gap={4}
                    >
                        <Heading>
                            Rental Agreement
                        </Heading>
                        <Flex
                            direction='column'
                            gap={2}
                        >
                            <Text>
                                Price: {price} / day
                            </Text>
                            <Text>
                                Max Duration: {maxDuration} days
                            </Text>
                            <Text>
                                Duration: {duration} days
                            </Text>
                            <Slider 
                                step={0.001}
                                value={duration}
                                onChange={(val) => setDuration(val)}
                                min={0}
                                max={maxDuration}
                            >
                                <SliderTrack>
                                    <SliderFilledTrack 
                                        color='brand'
                                    />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </Flex>
                        <Text>
                            You are renting this NFT for <span>{duration.toFixed(3)}</span> days for a total price of {(duration * price).toFixed(3)} ETH.
                        </Text>
                        <Button
                            variant='solid'
                            colorScheme='brand'
                        >
                            Rent
                        </Button>
                    </Card>
                </SimpleGrid>
                <Card>
                    <Heading>
                        Token Info
                    </Heading>
                    <HStack
                        justify='space-between'
                    >
                        <Text>
                            rNFT Contract Address
                        </Text>
                        <Text>
                            {token.contractAddress}
                        </Text>
                    </HStack>
                    <HStack
                        justify='space-between'
                    >
                        <Text>
                            rNFT Token ID
                        </Text>
                        <Text>
                            {token.tokenId}
                        </Text>
                    </HStack>
                    <HStack
                        justify='space-between'
                    >
                        <Text>
                            Original Contract Address
                        </Text>
                        <Text>
                            {token.contractAddress}
                        </Text>
                    </HStack>
                    <HStack
                        justify='space-between'
                    >
                        <Text>
                            Original Token ID
                        </Text>
                        <Text>
                            {token.tokenId}
                        </Text>
                    </HStack>
                </Card>
            </Container>
        )
    } else {
        return null;
    }
}

export default Token