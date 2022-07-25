import { useState, FC } from 'react'
import { VStack, Input, Button } from '@chakra-ui/react'
import useMintNFT from '../../hooks/useMintNFT'

interface Props {
    contractAddress: string
}

const Mint : FC<Props> = ({ contractAddress }) => {

    const { mint } = useMintNFT(contractAddress)

    const [uri, setUri] = useState<string>('')

    return (
        <VStack>
            <Input
                placeholder="URI"
                value={uri}
                onChange={(e) => setUri(e.target.value)}
            />
            <Button
                onClick={() => mint(uri)}
            >
                Mint
            </Button>
        </VStack>
    )
}

export default Mint