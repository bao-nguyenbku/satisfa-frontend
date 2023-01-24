import { Playfair_Display } from '@next/font/google';
import Head from 'next/head';
import HomePage from './home';

const playfair_display = Playfair_Display({
  subsets: ['latin'],
});
export default function Home() {
  return (
    <div className={playfair_display.className}>
      <Head>
        <title>Satisfa</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HomePage />
      </main>
    </div>
  );
}
