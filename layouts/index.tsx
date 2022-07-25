// Chakra imports
import { Portal, Box, useDisclosure, Container, Flex } from "@chakra-ui/react";
// Layout components
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { SidebarContext } from "../contexts/SidebarContext";
import React, { useState, createRef } from "react";

import { useRouter } from "next/router";
import routes from "../routes";

import { useNetwork } from "wagmi";
import IncorrectChain from "./IncorrectChain";

interface Props {
  children: React.ReactNode;
}

// Custom Chakra theme
const Layout : React.FC<Props> = ({ children }) => {
  // states and functions
  const router = useRouter();
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const { chain } = useNetwork();

  const getActiveRoute = (routes) => {
    let activeRoute = "Decentralease";
    for (let i = 0; i < routes.length; i++) {
      if(router.asPath === routes[i].path){
        activeRoute = routes[i].name;
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          router.asPath.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          router.asPath.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };
  const { onOpen } = useDisclosure();

  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
    >
        <Sidebar 
            routes={routes}
        />
        <Box
          float='right'
          minHeight='100vh'
          height='100%'
          overflow='auto'
          position='relative'
          maxHeight='100%'
          w={{ base: "100%", xl: "calc( 100% - 290px )" }}
          maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
          transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
          transitionDuration='.2s, .2s, .35s'
          transitionProperty='top, bottom, width'
          transitionTimingFunction='linear, linear, ease'
        >
          <Portal>
            <Navbar
              onOpen={onOpen}
              brandText={getActiveRoute(routes)}
              secondary={getActiveNavbar(routes)}
              message={getActiveNavbarText(routes)}
              fixed={fixed}
            />
          </Portal>
          <Flex
            direction='column'
            alignItems='center'
            w='100%'
          >
            <Container
              px='2rem'
              pt={`150px`}
              maxWidth={{ base: "100%", "lg": '75%' }}
              display='flex'
              flexDirection='column'
              alignItems='center'
            >
              {
                chain?.unsupported ? (
                  <IncorrectChain />
                ) : (
                  children
                )
              }
            </Container>
          </Flex>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}

export default Layout;