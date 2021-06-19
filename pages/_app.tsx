import React, { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components'
import useSWR, { SWRConfig } from 'swr';
import NavBar from "../components/navigation/NavBar";

import theme from '../styles/theme';
import { GlobalStyle } from "../styles/GlobalStyle.style";

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Laptop finder</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <GlobalStyle />
        <NavBar title='Laptop Finder App' menuIcon />
        <SWRConfig value={{ fetcher: (url: string) => fetch(url).then(res => res.json()) }}>
          <Component {...pageProps} />
        </SWRConfig>

      </ThemeProvider>
    </>
  );
}

export default MyApp
