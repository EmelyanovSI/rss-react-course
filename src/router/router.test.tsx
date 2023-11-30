import * as redux from '@/redux';
import { render, screen } from '@/utils/test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routesConfig } from './router';

describe('Router', () => {
  it('renders RootLayout on the root path', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('root-layout')).toBeInTheDocument();
  });

  it('renders MainLayout on "/page/:page"', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/page/1'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
  });

  it('renders DetailsLayout on "/page/:page/:details"', () => {
    vi.spyOn(redux, 'useGetPageQuery').mockReturnValue({
      data: {
        page: {},
        animals: [],
      },
      isError: false,
      isLoading: false,
      isFetching: false,
      isUninitialized: false,
      refetch: vi.fn(),
    });

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/page/1/card-details'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('details-layout')).toBeInTheDocument();
  });

  it('renders NotFoundPage on unknown route', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/unknown-route'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
