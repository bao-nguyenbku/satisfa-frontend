import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { store } from '../store'; 

const theme = createTheme({})
export default function App({ Component, pageProps }: AppProps) {
  return (
    
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  )
  
}
