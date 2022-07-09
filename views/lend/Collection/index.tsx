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

import CollectionDetails from '../../../components/collection/CollectionDetails';

import Owned from './Owned';
import Staked from './Staked';

interface Props {
    contractAddress: string;
    chain? : string;
}

const Collection : React.FC<Props> = ({ contractAddress }) => {
    return (
        <Container
            gap={8}
            display='flex'
            flexDirection='column'
            alignItems='center'
            maxW="5xl"
            py='1rem'
        >
            <CollectionDetails 
                contractAddress={contractAddress}
            />
            <Tabs 
                isFitted
                w={'100%'}
            >
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