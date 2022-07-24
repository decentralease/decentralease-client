import { useState, FC } from 'react'
import { VStack, Input, Button } from '@chakra-ui/react'
import useMintNFT from '../../hooks/useMintNFT'

interface Props {
    contractAddress: string
}

const Mint : FC<Props> = ({ contractAddress }) => {

    const { mint } = useMintNFT(contractAddress)

    const [name, setName] = useState<string>('')
    const [file, setFile] = useState<File>()


    return (
        <VStack>
            <Input
                placeholder="Image"
                type='file'
                onChange={(e) => setFile(e.target.files[0])}
            />
            <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Button
                onClick={() => mint(name, file)}
            >
                Mint
            </Button>
        </VStack>
    )
}

export default Mint