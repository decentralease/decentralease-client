import React from 'react'

import {
    Container,
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel,
    Skeleton
} from '@chakra-ui/react';

import Available from './Available';
import Active from './Active';
import CollectionDetails from '../../../components/collection/CollectionDetails';

interface Props {
    contractAddress: string;
}

const Collection : React.FC<Props> = ({ contractAddress }) => {

    return (
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
            <Skeleton
                isLoaded={contractAddress !== undefined}
                w="100%"
            >
                <Tabs 
                    isFitted
                    w={'100%'}
                >
                    <TabList>
                        <Tab>Available for Rent</Tab>
                        <Tab>Active Rentals</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {
                                contractAddress !== undefined && (
                                    <Available 
                                        contractAddress={contractAddress}
                                    />
                                )
                            }
                        </TabPanel>
                        <TabPanel>
                            <Active
                                contractAddress={contractAddress}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Skeleton>
        </Container>
    )
}

export default Collection