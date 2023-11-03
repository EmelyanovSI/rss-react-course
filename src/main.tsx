import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from './pages/ErrorPage';
import Root from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
