import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './app/App';
import { UserProvider } from './context/UserContext';
import { ProfileModalProvider } from './context/ProfileModalContext'; // 👈 importa el provider

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProfileModalProvider> {/* 👈 ahora envuelves App aquí */}
          <App />
        </ProfileModalProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
