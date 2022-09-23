import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import styles from './Home.module.css';

const ENGLISH = 'en';

export const routerPushLocale = ({
  router,
  locale = ENGLISH
} = {}) => {
  if (router) {
    const {
      pathname,
      asPath,
      query,
      push: routerPush
    } = router;

    routerPush(
      { pathname, query },
      asPath,
      { locale }
    );
  }
};

const NestedComponent = () => {
  useEffect(() => {
    console.log('NESTED COMPONENT MOUNTED');

    return () => {
      console.log('NESTED COMPONENT UNMOUNTED');
    }
  }, []);

  const { i18n } = useTranslation();
  const router = useRouter();
  const { resolvedLanguage } = i18n;
  const handleChangeLanguage = useCallback(() => routerPushLocale({
    router,
    locale: resolvedLanguage === ENGLISH
      ? 'fr' 
      : ENGLISH
  }), [resolvedLanguage, router]);

  const [count, setCount] = useState(0);
  const handleIncrementCount = useCallback(() => setCount((count) => count + 1), [])

  return (
    <>
      <span className={styles.count}>
        { count }
      </span>
      <button className={styles.incrementCountButton} onClick={handleIncrementCount}>Increment Count</button>
      <span className={styles.description}>
        The count component above represents a component that should be shared across all pages.
        <br /><br />
        It's lifecycle should not reset when the locale changes.
        <br /><br />
        Use cases for this are common elements such a music players, common navigation elements, etc.
      </span>

      <button className={styles.changeLanguageButton} onClick={handleChangeLanguage}>Change Language</button>
    </>
  );
};

const Home = () => {
  return <NestedComponent />;
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    },
  };
}

export default Home;