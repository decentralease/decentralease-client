import React from 'react'

import {
    Spinner,
    Text,
    VStack,
    Container,
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel
} from '@chakra-ui/react';

import useCollectionDetails from '../../../hooks/useCollectionDetails';

import Available from './Available';
import Active from './Active';
import CollectionDetails from '../../../components/collection/CollectionDetails';

interface Props {
    contractAddress: string;
}

const Collection : React.FC<Props> = ({ contractAddress }) => {

    const { collection, loading } = useCollectionDetails(contractAddress);

    if(loading) {
        return (
            <VStack>
                <Spinner 
                    size='xl'
                />
                <Text>Loading...</Text>
            </VStack>
        )
    } else {
        return (
            <>
                <Container
                    gap={8}
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    maxW="3xl"
                    py='1rem'
                >
                    <CollectionDetails
                        contractAddress={contractAddress}
                    />
                    <Tabs isFitted>
                        <TabList>
                            <Tab>Available for Rent</Tab>
                            <Tab>Active Rentals</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Available 
                                    contractAddress={contractAddress}
                                />
                            </TabPanel>
                            <TabPanel>
                                <Active
                                    contractAddress={contractAddress}
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    
                </Container>
            </>
        )
    }
}

export default Collection