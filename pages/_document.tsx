import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet" /> 
            <title>Decentralease</title>
            <meta name="description" content="NFT renting, leasing, BNPL, and free trials" />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}