import '../styles/normalize.css';
import '../styles/global.css';
import '../styles/layout.css';
import '../styles/interactive.css';
import '../styles/form.css';
import '../styles/misc.css';
import { UIProvider } from '../contexts/UIConttext';
// import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return (
  <UIProvider>
    <Component {...pageProps} />
  </UIProvider>
  );
}

export default MyApp
