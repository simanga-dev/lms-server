import Head from 'next/head';
import { ReactNode } from 'react';
import 'semantic-ui-css/semantic.min.css'

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Live Stock Tracking System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
    </>
  );
};
