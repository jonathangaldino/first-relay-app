import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
   * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  /* 
    Nord Theme

    Polar Night

    - #2E3440
    - #3B4252
    - #434C5E
    - #4C566A

    Snow Storm

    - #D8DEE9
    - #E5E9F0
    - #ECEFF4
  */

  body {
    font: 400 14px Roboto, sans-serif;
    background: #2E3440;
    color: #ECEFF4;
    -webkit-font-smoothing: antialiased;
  }

  body, html, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
  }
`;