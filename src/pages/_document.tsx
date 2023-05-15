import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <meta charSet="utf-8" />
        <meta name="description" content="Satisfa Restaurant. Luxury services" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
