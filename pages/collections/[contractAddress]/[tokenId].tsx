import React from 'react'
import Token from '../../../views/marketplace/Token';

import { useRouter } from 'next/router'

const TokenPage : React.FC = () => {

  const { query } = useRouter();

  const { contractAddress, tokenId } = query;

  return (
    <Token 
      contractAddress={contractAddress as string}
      tokenId={tokenId as string}
    />
  )
}

export default TokenPage