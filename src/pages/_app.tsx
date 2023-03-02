import { ReactNode, ReactElement } from 'react';
import type { NextPage } from 'next';
import '../styles/globals.scss';
import type { AppProps, AppLayoutProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import { SessionProvider } from 'next-auth/react';
import { AnimatePresence } from 'framer-motion';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MainLayout from '@/layout/main';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { playfair_display } from '@/constants';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);
  return (
    <AnimatePresence mode="wait">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <main className={playfair_display.className}>
          <SessionProvider session={session}>
            <Provider store={store}>
              {getLayout(<Component {...pageProps} />)}
            </Provider>
          </SessionProvider>
        </main>
      </LocalizationProvider>
    </AnimatePresence>
  );
}
