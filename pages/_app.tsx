import Head from 'next/head'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme,responsiveFontSizes } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { AuthProvider } from '../components/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = responsiveFontSizes(createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light'
    },
    typography: {
      fontFamily: [
       'Roboto',
       'Noto Sans JP', 
       'Helvetica',
       'Arial',
       'sans-serif',
     ].join(','),
    }
  }))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
