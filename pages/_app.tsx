import React, { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box, Container, CssBaseline } from "@material-ui/core";
import useSWR, { SWRConfig } from 'swr';
import NavBar from "../components/navigation/NavBar";
import theme from './theme';

import '../styles/globals.css'

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
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <NavBar />
        <SWRConfig value={{ fetcher: (url: string) => fetch(url).then(res => res.json()) }}>
          <Container maxWidth={false}>
            <Box marginTop={2}>
              <Component {...pageProps} />
            </Box>
          </Container>
        </SWRConfig>

      </ThemeProvider>
    </>
  );
}

export default MyApp
