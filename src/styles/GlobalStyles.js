import { createGlobalStyle } from 'styled-components';

    const GlobalStyles = createGlobalStyle`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        background: #0f0f1a;
        color: #e0e0e0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
      }

      h1, h2, h3 {
        color: #e0e0e0;
        line-height: 1.2;
      }

      a {
        color: #54a0ff;
        text-decoration: none;
      }

      button {
        font-family: inherit;
      }
    `;

    export default GlobalStyles;
