import { RouterParams } from '@/constants';
import { AnimalPageResponse, AnimalResponse } from '@/interfaces/animal';
import CardLayout from '@/layouts/CardLayout';
import ListLayout from '@/layouts/ListLayout';
import RootLayout from '@/layouts/RootLayout';
import CardPage from '@/pages/CardPage';
import ErrorPage from '@/pages/ErrorPage';
import ListPage from '@/pages/ListPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { fetchAnimal, fetchPage } from '@/services/animal';
import { getSearchFromStorage } from '@/utils';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Params,
  Route,
} from 'react-router-dom';

const listLoader = async ({
  params,
  request,
}: {
  params: Params<RouterParams>;
  request: Request;
}): Promise<AnimalPageResponse> => {
  const search =
    new URL(request.url).searchParams.get('search') ?? getSearchFromStorage();
  const result = await fetchPage(search, Number(params.page) - 1, params.limit);

  if (!result.ok) {
    throw Error('Could not find animals');
  }

  return result.json();
};

const cardLoader = async ({
  params,
}: {
  params: Params<RouterParams>;
}): Promise<AnimalResponse> => {
  const result = await fetchAnimal(params.details);

  if (!result.ok) {
    throw Error('Could not find more info');
  }

  return result.json();
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<Navigate to="page" replace />} />
      <Route path="page" element={<Navigate to="1" replace />} />
      <Route path="page/:page" element={<ListLayout />}>
        <Route index element={<Navigate to="limit" replace />} />
        <Route path="limit" element={<Navigate to="10" replace />} />
        <Route
          path="limit/:limit"
          element={<ListPage />}
          errorElement={<ErrorPage />}
          loader={listLoader}
        >
          <Route path=":details" element={<CardLayout />}>
            <Route
              index
              element={<CardPage />}
              errorElement={<ErrorPage />}
              loader={cardLoader}
            />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;
