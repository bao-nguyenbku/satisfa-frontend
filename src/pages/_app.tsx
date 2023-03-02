import { ReactNode, ReactElement } from 'react';
import type { NextPage } from 'next';
import '../styles/globals.scss';
import type { AppProps, AppLayoutProps } from 'next/app';
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
import { AnimatePresence } from 'framer-motion';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MainLayout from '@/layout/main';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { playfair_display } from '@/constants';

const theme = createTheme({});
const emotionCache = createCache({
  key: 'css',
  prepend: true,
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({
  Component,
  pageProps: { session, ...rest },
}: AppPropsWithLayout) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);
  return (
    <AnimatePresence mode="wait">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <main className={playfair_display.className}>
          <StyledEngineProvider injectFirst>
            <CacheProvider value={emotionCache}>
              <ThemeProvider theme={theme}>
                <SessionProvider session={session}>
                  <Provider store={store}>
                    {getLayout(<Component {...props.pageProps} />)}
                  </Provider>
                </SessionProvider>
              </ThemeProvider>
            </CacheProvider>
          </StyledEngineProvider>
        </main>
      </LocalizationProvider>
    </AnimatePresence>
  );
};

export default wrapper.withRedux(App);
