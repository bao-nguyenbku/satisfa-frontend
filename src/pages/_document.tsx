import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
