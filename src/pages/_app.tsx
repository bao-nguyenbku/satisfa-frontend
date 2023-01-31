import { ReactNode, ReactElement } from 'react';
import type { NextPage } from 'next';
import '../styles/globals.scss';
import type { AppProps, AppLayoutProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import { Playfair_Display } from '@next/font/google';
import { SessionProvider } from 'next-auth/react';
import MainLayout from '@/layout/main';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const playfair_display = Playfair_Display({
  subsets: ['latin'],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);
  return (
    <main className={playfair_display.className}>
      <SessionProvider session={session}>
        <Provider store={store}>
          {getLayout(<Component {...pageProps} />)}
        </Provider>
      </SessionProvider>
    </main>
  );
}
