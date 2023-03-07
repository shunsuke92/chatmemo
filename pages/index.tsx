import Head from 'next/head';

import CssBaseline from '@mui/material/CssBaseline';

import { Main } from '../components/Main';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <CssBaseline />
      <Head>
        <title>chatmemo</title>
        <meta name='description' content='チャットのようにメモする新感覚のメモアプリ' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Main />
    </>
  );
};

export default Home;
