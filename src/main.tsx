import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ModalContext } from '@contexts/ModalContext.tsx';
import '@scss/global.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalContext>
      <App />
    </ModalContext>
  </StrictMode>,
);
