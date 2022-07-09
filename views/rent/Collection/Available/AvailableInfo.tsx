import React from 'react';

import moment from "moment"

import { 
    VStack,
    Text
} from "@chakra-ui/react"


interface Props {
    maxEndTime: moment.Moment,
    rate: number
}

const AvailableInfo : React.FC<Props> = ({ maxEndTime, rate }) => {
    return (
        <VStack
            spacing={0}
        >
            <Text>{rate} MATIC / day</Text>
            <Text>Available Until: {maxEndTime.format("M/D/YY h:mm A")}</Text>
        </VStack>
    )
}

export default AvailableInfo