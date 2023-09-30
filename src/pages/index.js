import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <h1>See the <a href="/docs/category/ctf-cheatsheets">
          docs
        </a></h1>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title={`gcholette docs`}
      description="Personal reference">
      <HomepageHeader />
    </Layout>
  );
}
