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
import CardLayout from './layouts/CardLayout';
import ListLayout from './layouts/ListLayout';
import RootLayout from './layouts/RootLayout';
import CardPage from './pages/CardPage';
import ErrorPage from './pages/ErrorPage';
import List from './pages/ListPage';
import NotFoundPage from './pages/NotFoundPage';
import { fetchAnimal, fetchPage } from './services/Animal';
import { getSearchValue, setSearchValue } from './utils';

const listLoader = async ({
  params,
}: {
  params: Params;
}): Promise<AnimalPageResponse> => {
  const result = await fetchPage(params.search, +params.number! - 1);

  if (!result.ok) {
    throw Error('Could not find animals');
  }

  return result.json();
};

const cardLoader = async ({
  params,
}: {
  params: Params;
}): Promise<AnimalResponse> => {
  const result = await fetchAnimal(params.uid!);

  if (!result.ok) {
    throw Error('Could not find more info');
  }

  return result.json();
};

const searchValue = getSearchValue();

const renderRoutes = () => (
  <>
    <Route index element={<Navigate to="1" replace />} />
    <Route
      path=":number"
      element={<List />}
      errorElement={<ErrorPage />}
      loader={listLoader}
    >
      <Route path=":uid" element={<CardLayout />}>
        <Route
          index
          element={<CardPage />}
          errorElement={<ErrorPage />}
          loader={cardLoader}
        />
      </Route>
    </Route>
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout {...{ searchValue, setSearchValue }} />}
      errorElement={<ErrorPage />}
    >
      <Route index element={<Navigate to={`${searchValue}/page`} replace />} />
      <Route path="page" element={<ListLayout />}>
        {renderRoutes()}
      </Route>
      <Route path=":search" element={<Navigate to="page" replace />} />
      <Route path=":search/page" element={<ListLayout />}>
        {renderRoutes()}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
