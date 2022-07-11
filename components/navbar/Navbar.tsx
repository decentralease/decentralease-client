// Chakra Imports
import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import AdminNavbarLinks from "./NavbarLinks";

interface Props {
  brandText: string;
  secondary: boolean;
  message?: string;
  fixed: boolean;
  onOpen: () => void;
}

const AdminNavbar : React.FC<Props> = ({ 
  brandText,
  secondary,
  message,
  fixed,
  onOpen,
}) => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);

    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  });

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let mainText = useColorModeValue("navy.700", "white");
  let secondaryText = useColorModeValue("gray.700", "white");
  let navbarFilter = "none";
  let navbarBackdrop = "blur(20px)";
  let navbarShadow = "none";
  let navbarBg = useColorModeValue(
    "rgba(244, 247, 254, 0.2)",
    "rgba(11,20,55,0.5)"
  );
  let navbarBorder = "transparent";
  let secondaryMargin = "0px";
  let gap = '1rem';
  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <Box
      position='fixed'
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      backgroundPosition='center'
      backgroundSize='cover'
      borderRadius='16px'
      borderWidth='1.5px'
      borderStyle='solid'
      transitionDelay='0s, 0s, 0s, 0s'
      transitionDuration=' 0.25s, 0.25s, 0.25s, 0s'
      transition-property='box-shadow, background-color, filter, border'
      transitionTimingFunction='linear, linear, linear, linear'
      alignItems={{ xl: "center" }}
      display={secondary ? "block" : "flex"}
      minH='75px'
      justifyContent={{ xl: "center" }}
      lineHeight='25.6px'
      mx='auto'
      mt={secondaryMargin}
      pb='8px'
      right={0}
      px={{base: "1rem", xl: "2rem"}}
      pt='8px'
      top={{ base: "12px", md: "16px", xl: "18px" }}
      w={{
        base: "100%",
        xl:'calc(100% - 320px)'
      }}
    >
      <Flex
        w='100%'
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={gap}
      >
        <HStack>
          <Link
            color={mainText}
            href='#'
            bg='inherit'
            borderRadius='inherit'
            fontWeight='bold'
            _hover={{ color: { mainText } }}
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
          >
            <Text
              fontSize={{base: 'lg', sm: '2xl', xl: '2xl'}}
            >
              {brandText}
            </Text>
          </Link>
        </HStack>
        <Box ms='auto'>
          <AdminNavbarLinks
            onOpen={onOpen}
            secondary={secondary}
            fixed={fixed}
          />
        </Box>
      </Flex>
      {secondary ? <Text color='white'>{message}</Text> : null}
    </Box>
  );
}

export default AdminNavbar;