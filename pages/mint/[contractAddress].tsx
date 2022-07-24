import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Mint from '../../views/mint';

const MintPage : NextPage = () => {

  const { query } = useRouter();
  const { contractAddress } = query;

  if(!contractAddress) {
    return null;
  }

  return (
    <Mint 
      contractAddress={contractAddress as string}
    />
  )
}

export default MintPage;