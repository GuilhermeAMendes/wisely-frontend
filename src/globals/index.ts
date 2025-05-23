import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
     font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
  }

  @media (min-width: 321px) {
  font-size: 10px;
}

@media (min-width: 1226px) {
  font-size: 11px;
}

@media (min-width: 1441px) {
  font-size: 14px;
}

@media (min-width: 2561px) {
  font-size: 16px;
}
`;
