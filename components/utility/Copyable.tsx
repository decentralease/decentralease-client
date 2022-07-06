
import { useState } from 'react';
import { Tooltip, Button } from '@chakra-ui/react';
import copy from "clipboard-copy";

interface Props {
    copyText: string;
    displayText: string;
    color?: string;
}

const Copyable : React.FC<Props> = ({copyText, displayText, color}) => {

    const handleOnClick = () => {
        copy(copyText);
    };

    return (
        <Tooltip
            label="Copy"
        >
            <Button 
                variant="text" 
                size='small' 
                color={color}
                sx={{
                    padding: 0,
                }}
                onClick={handleOnClick}
            >
                {displayText}
            </Button>
        </Tooltip>
    )
}

export default Copyable;