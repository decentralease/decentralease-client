import React from 'react'

import {
    Spinner,
    Text,
    Heading,
    Image,
    VStack,
    Container,
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel
} from '@chakra-ui/react';

import useCollectionDetails from '../../../hooks/useCollectionDetails';
import Owned from './Owned';
import Staked from './Staked';

interface Props {
    contractAddress: string;
    chain? : string;
}

const Collection : React.FC<Props> = ({ contractAddress, chain = 'ethereum' }) => {

    const { 
        collection, 
        loading, 
    } = useCollectionDetails(contractAddress, chain);

    if(loading) {
        return (
            <VStack>
                <Spinner 
                    size='xl'
                />
                <Text>Loading...</Text>
            </VStack>
        )
    } 
    if(!collection) {
        return (
            <VStack>
                <Text>Collection not found</Text>
            </VStack>
        )
    }
    return (
        <Container
            gap={8}
            display='flex'
            flexDirection='column'
            alignItems='center'
            maxW="3xl"
            py='1rem'
        >
            <VStack
                position='relative'
                mb={'30px'}
            >
                <Image
                    alt="Banner Image"
                    src={collection.bannerUrl}
                    maxHeight="200px"
                    borderRadius={'2rem'}
                />
                <Image
                    alt="Logo Image"
                    src={collection.thumbnailUrl}
                    position='absolute'
                    height={'60px'}
                    width={'60px'}
                    borderRadius={'50%'}
                    bottom={'-30px'}
                />
            </VStack>
            <VStack
                alignItems='center'
            >
                <Heading>{collection.name}</Heading>
                <Text
                    textAlign='center'
                >
                    {collection.description}
                </Text>
            </VStack>
            <Tabs isFitted>
                <TabList>
                    <Tab>Owned NFTs</Tab>
                    <Tab>Staked NFTs</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Owned 
                            contractAddress={contractAddress}
                        />
                    </TabPanel>
                    <TabPanel>
                        <Staked
                            contractAddress={contractAddress}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    )
}

export default Collection