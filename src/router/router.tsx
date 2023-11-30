import DetailsLayout from '@/layouts/DetailsLayout';
import MainLayout from '@/layouts/MainLayout';
import RootLayout from '@/layouts/RootLayout';
import DetailsPage from '@/pages/DetailsPage';
import ErrorPage from '@/pages/ErrorPage';
import MainPage from '@/pages/MainPage';
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
    <Route path="page" element={<MainLayout />}>
      <Route index element={<Navigate to="1" replace />} />
      <Route path=":page" element={<MainPage />} errorElement={<ErrorPage />}>
        <Route path=":details" element={<DetailsLayout />}>
          <Route index element={<DetailsPage />} errorElement={<ErrorPage />} />
        </Route>
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Route>
);

const router = createBrowserRouter(routesConfig);

export default router;
