import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Params,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import { AnimalPageResponse, AnimalResponse } from './interfaces/Animal';
import CardLayout from './pages/CardLayout';
import CardPage from './pages/CardPage';
import ErrorPage from './pages/ErrorPage';
import ListLayout from './pages/ListLayout';
import List from './pages/ListPage';
import RootLayout from './pages/RootLayout';
import { fetchAnimal, fetchPage } from './services/Animal';

const listLoader = async ({
  params,
}: {
  params: Params;
}): Promise<AnimalPageResponse> => {
  return await fetchPage(params.search, +params.number! - 1);
};

const cardLoader = async ({
  params,
}: {
  params: Params;
}): Promise<AnimalResponse> => {
  return await fetchAnimal(params.uid!);
};

const renderRoutes = () => (
  <>
    <Route index element={<Navigate to="1" replace />} />
    <Route path=":number" element={<List />} loader={listLoader}>
      <Route path=":uid" element={<CardLayout />}>
        <Route index element={<CardPage />} loader={cardLoader} />
      </Route>
    </Route>
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route path="page" element={<ListLayout />}>
        {renderRoutes()}
      </Route>
      <Route path=":search/page" element={<ListLayout />}>
        {renderRoutes()}
      </Route>
    </Route>
  )
);

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
