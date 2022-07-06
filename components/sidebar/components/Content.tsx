// chakra imports
import { Box, Flex, Stack } from "@chakra-ui/react";
//   Custom components
import Links from "./Links";
import React from "react";

interface Props {
  onClose?: () => void;
}

const SidebarContent : React.FC<Props> = ({ onClose }) => {

  // SIDEBAR
  return (
    <Flex 
      direction='column' 
      height='100%' 
      pt='25px' 
      borderRadius='30px'
    >
      <Stack 
        direction='column' 
        mb='auto' 
        mt='8px'
      >
        <Box 
          ps='20px' 
          pe={{ md: "16px", "2xl": "1px" }}
        >
          <Links
            onClose={onClose}
          />
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
