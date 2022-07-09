import React from 'react'

import {
    VStack,
    Text
} from '@chakra-ui/react';

import moment from 'moment';

interface Props {
    endTime: moment.Moment
}

const ActiveInfo : React.FC<Props> = ({ endTime }) => {
  return (
    <VStack>
        <Text>Active Until: {endTime.format("M/D/YY h:mm A")}</Text>
    </VStack>
  )
}

export default ActiveInfo