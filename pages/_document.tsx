import React from "react";
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { ServerStyleSheet } from "styled-components";
import theme from '../styles/theme';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang='en'>
                <Head>
                    <meta charSet="utf-8" />
                    {/* PWA primary color */}
                    <meta name="theme-color" content={theme.colors.primary.main} />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                </Head>
                <body>
                    <Main />
                    {/* Here we will mount our modal portal */}
                    <div id="modal" />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async ctx => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.

    const styledComponentsSheet = new ServerStyleSheet();
    const materialSheets = new ServerStyleSheets();

    //const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: App => props => styledComponentsSheet.collectStyles(materialSheets.collect(<App {...props} />)),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        /*styles: (
            <React.Fragment>
                {initialProps.styles}
                {materialSheets.getStyleElement()}
                {styledComponentsSheet.getStyleElement()}
            </React.Fragment>
        ),*/
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
            ...React.Children.toArray(initialProps.styles), 
            materialSheets.getStyleElement(),
            styledComponentsSheet.getStyleElement(),
        ],
    };
};

export default MyDocument
