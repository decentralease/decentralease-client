import React from 'react'

import Link from 'next/link'
import { 
    Text, 
    Heading,
    SimpleGrid,
} from '@chakra-ui/react'
import {
    TbFileCode,
    TbCode
} from 'react-icons/tb'
import Card from '../../components/card/Card'

const data = [
    {
        heading: "List ERC-4907 Contract",
        description: "List an ERC-4907 contract on the marketplace.",
        href: "/list/4907",
        icon: <TbFileCode size={60} />,
    },
    {
        heading: "List ERC-721 Contract",
        description: "Wrap and list an ERC-721 contract on the marketplace.",
        href: "/list/721",
        icon: <TbCode size={60} />,
    }
]
  

const ListView = () => {
  return (
    <Card
        borderRadius={"1rem"}
        p='2rem'
        gap={8}
      >
        <Heading
          textAlign='center'
          size='lg'
        >
          List Contract on Marketplace
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={8}
        >
            {
                data.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                    >
                        <Card
                            p={4}
                            borderRadius='1rem'          
                            borderWidth={2}
                            _hover={{
                                shadow: 'lg',
                                cursor: 'pointer',
                                borderColor: 'brand.400'
                            }}
                            alignItems='center'
                            gap={2}
                        >
                            {item.icon}
                            <Heading
                                size='md'
                            >
                                {item.heading}
                            </Heading>
                            <Text
                                textAlign='center'
                            >
                                {item.description}
                            </Text>
                        </Card>
                    </Link>
                ))
            }
        </SimpleGrid>
      </Card>
  )
}

export default ListView