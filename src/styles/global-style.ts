import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    max-width: 100vw;
    max-height: 100vh;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  body{
    font-family: Pretendard,-apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    min-height: 100%;
  }
  a { cursor: pointer; text-decoration: none; }

  li{list-style: none;}

  button{
    background: none;
    border: none;
    padding: 0;
    cursor: default;
  }
`;
