import React from 'react';
import Main from './pages/Main';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </>
  );
}

export default App;
