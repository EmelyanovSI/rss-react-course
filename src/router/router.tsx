import RootLayout from '@/layouts/RootLayout.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import HookFormPage from '@/pages/HookFormPage.tsx';
import NotFoundPage from '@/pages/NotFoundPage.tsx';
import UncontrolledFormPage from '@/pages/UncontrolledFormPage.tsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

export const routesConfig = createRoutesFromElements(
  <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
    <Route path="uncontrolled" element={<UncontrolledFormPage />} />
    <Route path="hook" element={<HookFormPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>
);

const router = createBrowserRouter(routesConfig);

export default router;
