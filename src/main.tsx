import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import App from './App.tsx';
import { ModalContext } from '@contexts/ModalContext.tsx';
import '@scss/global.scss';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalContext>
        <App />
      </ModalContext>
    </QueryClientProvider>
  </StrictMode>,
);
