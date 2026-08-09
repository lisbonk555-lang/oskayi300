if (typeof window !== 'undefined' && window.fetch) {
  try {
    const origFetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      value: origFetch,
      writable: true,
      configurable: true,
      enumerable: true,
    });
  } catch (e) {
    // Already defined or restricted
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
