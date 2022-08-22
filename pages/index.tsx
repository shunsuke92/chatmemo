import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useAuthContext } from '../components/AuthContext';
import  MenuBar  from '../components/MenuBar';

const Home: NextPage = () => {
  const user = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    console.log(user)
    if (!user) {
      /* router.push('/login'); */
    }
  });

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MenuBar />
      <main className={styles.main}>
      </main>

    </div>
  )
}

export default Home
