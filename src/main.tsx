import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './i18n/config';
import { initEmailJS } from './config/emailjs';
import { HelmetProvider } from 'react-helmet-async';
import { CurrencyProvider } from './hooks/useCurrency';

// Inicializar EmailJS
initEmailJS();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <CurrencyProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <App />
        </BrowserRouter>
      </CurrencyProvider>
    </HelmetProvider>
  </React.StrictMode>
);
