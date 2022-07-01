import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

const routes = [
  {
    name: "Home",
    path: "/",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: null,
  },
  {
    name: "Rentals",
    path: "/rentals",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: null,
    secondary: true,
  },
  {
    name: "Marketplace",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/marketplace",
    component: null,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: null,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: null,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "/rtl-default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: null,
  },
];

export default routes;
