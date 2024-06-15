import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from  './context/AuthProvider';

import "@fontsource/poppins";

const theme = createTheme({
  palette: {
    primary: {
      main: '#272829',
    },
    secondary: {
      main: '#939596',
    },
    araton: {
      main: '#FFF6E0',
    },
    acikton: {
      main: '#FFF6E0',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
    ].join(','),
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);


reportWebVitals();
