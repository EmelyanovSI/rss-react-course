import { Status } from '@/constants';
import * as hooks from '@/context/hooks';
import { render, screen } from '@/utils/test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routesConfig } from './router';

describe('Router Tests', () => {
  it('renders RootLayout on the root path', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('root-layout')).toBeInTheDocument();
  });

  it('renders ListLayout on "/page/:page"', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/page/1'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('list-layout')).toBeInTheDocument();
  });

  it('renders CardLayout on "/page/:page/limit/:limit/:details"', () => {
    vi.spyOn(hooks, 'useAppContext').mockReturnValue({
      status: Status.Succeeded,
      message: '',
      list: [],
      search: '',
    });

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/page/1/limit/10/card-details'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('card-layout')).toBeInTheDocument();
  });

  it('renders NotFoundPage on unknown route', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/unknown-route'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
