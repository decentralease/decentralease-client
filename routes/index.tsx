import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdAttachMoney,
  MdAddBox,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";

interface Route {
  name: string;
  path: string;
  icon: React.ReactNode;
  component: React.FC;
}

const routes : Route[] = [
  {
    name: "Home",
    path: "/",
    icon: (
      <Icon 
        as={MdHome} 
        width='20px' 
        height='20px' 
        color='inherit' 
      />
    ),
    component: null,
  },
  {
    name: "Marketplace",
    path: "/marketplace",
    icon: (
      <Icon
        as={MdAttachMoney}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: null,
  },
  {
    name: "Create",
    icon: (
      <Icon 
        as={MdAddBox}
        width='20px' 
        height='20px' 
        color='inherit' 
      />
    ),
    path: "/create",
    component: null,
  },
  {
    name: "Wallet",
    path: "/wallet",
    icon: (
      <Icon 
        as={MdOutlineAccountBalanceWallet} 
        width='20px' 
        height='20px' 
        color='inherit' 
      />
    ),
    component: null,
  }
];

export default routes;
