import React from "react";

import { Box, useStyleConfig } from "@chakra-ui/react";

interface Props {
  variant?: string;
  children: React.ReactNode;
  [x: string]: any;
}

const Card : React.FC<Props> = ({ variant, children, ...rest }) => {

  const styles = useStyleConfig("Card", { variant });

  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default Card;
