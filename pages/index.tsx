import Head from 'next/head';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { Main } from '../components/Main';
import { useCreateTheme } from '../hooks/useCreateTheme';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  const theme = useCreateTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>chatmemo</title>
        <meta name='description' content='チャットのようなメモアプリ' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Main />
    </ThemeProvider>
  );
};

export default Home;
