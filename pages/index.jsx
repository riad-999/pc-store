import Head from 'next/head';
import '../styles/normalize.css';
import '../styles/global.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home page</h1>
    </div>
  );
}
