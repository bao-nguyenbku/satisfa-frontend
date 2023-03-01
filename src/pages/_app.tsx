import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import createCache from "@emotion/cache";
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from "@emotion/react";
import { wrapper } from "@/store";


const theme = createTheme({})
const emotionCache = createCache({
  key: "css",
  prepend: true,
});
const App = ({ Component, ...rest}: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <Component {...props.pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </StyledEngineProvider>
    </Provider>
  )
  
}


export default wrapper.withRedux(App);