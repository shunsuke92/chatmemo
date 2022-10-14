import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import MenuBar from '../components/MenuBar';
import Mask from '../components/Mask';
import DeleteMemoAlertDialog from '../components/DeleteMemoAlertDialog';
import DeleteAccountAlertDialog from '../components/DeleteAccountAlertDialog';
import Timeline from '../components/Timeline';
import BottomBar from '../components/BottomBar';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useCreateTheme } from '../hooks/useCreateTheme';

const Home: NextPage = () => {
  const theme = useCreateTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <MenuBar />
      <main className={styles.main}>
        <Mask />
        <DeleteMemoAlertDialog />
        <DeleteAccountAlertDialog />
        <Timeline />
      </main>
      <BottomBar />
    </ThemeProvider>
  );
};

export default Home;
