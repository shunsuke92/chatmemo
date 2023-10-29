import { useEffect, useState } from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { useCreateTheme } from '../hooks/useCreateTheme';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = useCreateTheme();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <title>chatmemo</title>
        <meta name='description' content='チャットのようなメモアプリ' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {loading && (
        <>
          <div
            id='blockFOUC'
            style={{
              width: '100vw',
              height: '100vh',
              position: 'fixed',
              top: '0',
              left: '0',
              opacity: 0.8,
            }}
          ></div>
          <style jsx>{`
            #blockFOUC {
              background-color: #cbd5e1;
            }
            @media (prefers-color-scheme: dark) {
              #blockFOUC {
                background-color: #1e293b;
              }
            }
          `}</style>
        </>
      )}

      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
