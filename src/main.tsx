import App from '@/app';
import '@/index.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
