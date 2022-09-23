import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';

const  MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    console.log('APP MOUNTED');

    return () => {
      console.log('APP UNMOUNTED');
    }
  }, []);

  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp);