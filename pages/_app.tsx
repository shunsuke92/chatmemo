import Head from 'next/head';
import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Auth } from '../components/Auth';
import { SettingInfoProvider } from '../components/SettingInfoContext';
import { EditingInfoProvider } from '../components/EditingInfoContext';
import { SynchronizationProvider } from '../components/SynchronizationContext';
import { ManageTentativeIDProvider } from '../components/ManageTentativeIDContext';
import { DelayCompletedProvider } from '../components/DelayCompletedContext';
import { useCreateTheme } from '../hooks/useCreateTheme';
import { RecoilRoot } from 'recoil';

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
                    <EditingInfoProvider>
                      <Component {...pageProps} />
                    </EditingInfoProvider>
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
