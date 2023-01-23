import type { AppProps } from 'next/app';
import Head from 'next/head';

import { RecoilRoot } from 'recoil';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { Auth } from '../components/Auth';
import { DelayCompletedProvider } from '../components/DelayCompletedContext';
import { ManageTentativeIDProvider } from '../components/ManageTentativeIDContext';
import { SettingInfoProvider } from '../components/SettingInfoContext';
import { SynchronizationProvider } from '../components/SynchronizationContext';
import { useCreateTheme } from '../hooks/useCreateTheme';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = useCreateTheme();

  return (
    <>
      <CssBaseline />
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <Auth>
            <SettingInfoProvider>
              <SynchronizationProvider>
                <ManageTentativeIDProvider>
                  <DelayCompletedProvider>
                    <Component {...pageProps} />
                  </DelayCompletedProvider>
                </ManageTentativeIDProvider>
              </SynchronizationProvider>
            </SettingInfoProvider>
          </Auth>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
