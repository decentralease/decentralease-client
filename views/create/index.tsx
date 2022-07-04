import React from 'react'

import Link from 'next/link'
import { 
    Text, 
    Heading,
    VStack,
    SimpleGrid,
} from '@chakra-ui/react'
import {
    TbFileCode,
    TbCode
} from 'react-icons/tb'
import Card from '../../components/card/Card'

const data = [
    {
        heading: "Create from Scratch",
        description: "Create a new ERC-4907 contract tailored to your game mechanics.",
        href: "/create/new",
        icon: <TbCode size={60} />,
    },
    {
        heading: "Wrap ERC-721 Contract",
        description: "Wrap an existing ERC-721 contract to add ERC-4907 functionality.",
        href: "/create/wrap",
        icon: <TbFileCode size={60} />,
    }
]
  

const CreateView = () => {
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
          New ERC-4907 Contract
        </Heading>
        <SimpleGrid
          columns={2}
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

export default CreateView