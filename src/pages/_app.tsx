import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store'; 
import { Playfair_Display } from '@next/font/google';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/layout/main';

const playfair_display = Playfair_Display({
  subsets: ['latin'],
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <main className={playfair_display.className}>
      <SessionProvider session={session}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SessionProvider>
    </main>
  )
  
}
