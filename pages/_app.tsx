import Head from 'next/head';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from '../components/AuthContext';
import { DataProvider } from '../components/DataContext';
import { OperationProvider } from '../components/OperationContext';
import { SettingInfoProvider } from '../components/SettingInfoContext';
import { EditingInfoProvider } from '../components/EditingInfoContext';
import { useCreateTheme } from '../hooks/useCreateTheme';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = useCreateTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <AuthProvider>
        <SettingInfoProvider>
          <OperationProvider>
            <DataProvider>
              <EditingInfoProvider>
                <Component {...pageProps} />
              </EditingInfoProvider>
            </DataProvider>
          </OperationProvider>
        </SettingInfoProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
