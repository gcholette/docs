import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <h1>Documentation</h1>
      </div>
    </header>
  );
}

export default function Home() {
  // window.location.href = "/docs/category/ctf-cheatsheets"
  return (
    <Layout description="Personal reference">
      <HomepageHeader />
      <div className={clsx(styles.container)}>
        <a href="/docs/category/ctf-cheatsheets" className={clsx(styles.card)}>CTF Cheatsheets</a>
        <a href="/docs/category/programming" className={clsx(styles.card)}>Programming</a>
      </div>
    </Layout>
  );
}
