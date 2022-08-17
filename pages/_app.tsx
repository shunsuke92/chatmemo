import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme,responsiveFontSizes } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

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
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
