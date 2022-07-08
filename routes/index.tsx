import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdAttachMoney,
  MdAddBox,
  MdOutlineAccountBalanceWallet,
  MdSell
} from "react-icons/md";

interface Route {
  name: string;
  path: string;
  icon: React.ReactNode;
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
  },
  {
    name: "Rent",
    path: "/rent",
    icon: (
      <Icon
        as={MdAttachMoney}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
  },
  {
    name: "Lend",
    path: "/lend",
    icon: (
      <Icon
        as={MdSell}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
  },
  {
    name: "List",
    icon: (
      <Icon 
        as={MdAddBox}
        width='20px' 
        height='20px' 
        color='inherit' 
      />
    ),
    path: "/list",
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
  }
];

export default routes;
