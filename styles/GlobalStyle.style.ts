import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    html,
    body {
        margin: 0;
        padding: 0;
        font-family: 'Nunito', 'Roboto', Helvetica, sans-serif;
        background: #ffffff;
    }

    * {
        box-sizing: border-box;
    }

    a {
        color: inherit;
        text-decoration: none;
    }
    
`