import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './app/App';
import { UserProvider } from './context/UserContext';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider> {/* 👈 Envuélvelo aquí */}
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
);