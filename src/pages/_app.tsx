import React, { ReactNode, ReactElement, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import type { NextPage } from 'next';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import createCache from '@emotion/cache';

import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import { wrapper } from '@/store';
import { SessionProvider } from 'next-auth/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MainLayout from '@/layout/main';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { primaryFont } from '@/constants';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PayPalScriptOptions } from '@/types';
import { ModalContextProvider } from '@/context/modal-context';
const paypalScriptOptions: PayPalScriptOptions = {
  'client-id': process.env.NEXT_PUBLIC_CLIENT_ID as string,
  currency: 'USD',
};
const theme = createTheme({});
// const emotionCache = createCache({
//   key: 'css',
//   prepend: true,
// });

const muiCache = createCache({
  key: 'css',
  prepend: true,
});
export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({
  Component,
  pageProps: { session, ...rest },
}: AppPropsWithLayout) => {
  const { store } = wrapper.useWrappedStore(rest);
  useEffect(() => {
    AOS.init({
      anchorPlacement: 'top-bottom',
      duration: 600
    });
  }, []);
  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <CacheProvider value={muiCache}>
          <ThemeProvider theme={theme}>
            <SessionProvider session={session} refetchOnWindowFocus={false}>
              <main className={`${primaryFont.className}`}>
                <ModalContextProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <PayPalScriptProvider options={paypalScriptOptions}>
                      {getLayout(
                        <>
                          <Component {...rest} />
                          <ToastContainer />
                        </>,
                      )}
                    </PayPalScriptProvider>
                  </LocalizationProvider>
                </ModalContextProvider>
              </main>
            </SessionProvider>
          </ThemeProvider>
        </CacheProvider>
      </StyledEngineProvider>
    </Provider>
  );
};

export default App;
