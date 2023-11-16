import CardLayout from '@/layouts/CardLayout';
import ListLayout from '@/layouts/ListLayout';
import RootLayout from '@/layouts/RootLayout';
import CardPage from '@/pages/CardPage';
import ErrorPage from '@/pages/ErrorPage';
import ListPage from '@/pages/ListPage';
import NotFoundPage from '@/pages/NotFoundPage';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

export const routesConfig = createRoutesFromElements(
  <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
    <Route index element={<Navigate to="page/1" replace />} />
    <Route path="page" element={<ListLayout />}>
      <Route index element={<Navigate to="1" replace />} />
      <Route path=":page" element={<ListPage />} errorElement={<ErrorPage />}>
        <Route path=":details" element={<CardLayout />}>
          <Route index element={<CardPage />} errorElement={<ErrorPage />} />
        </Route>
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Route>
);

const router = createBrowserRouter(routesConfig);

export default router;
