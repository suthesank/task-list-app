import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import { GlobalStyles } from '@mui/material';
import AppContextProvider from './context/context_provider';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <ThemeProvider theme={theme}>
    <AppContextProvider>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: '#F4F4F6' } }} />
      <App />
    </AppContextProvider>
  </ThemeProvider>,
);
