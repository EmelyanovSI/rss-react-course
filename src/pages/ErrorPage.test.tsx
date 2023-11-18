import { render, screen } from '@/utils/test-utils';
import { MemoryRouter, useRouteError } from 'react-router-dom';
import ErrorPage from './ErrorPage';

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useRouteError: vi.fn(),
  };
});

describe('ErrorPage Component', () => {
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('renders the error messages and home button', () => {
    const mockError = new Error('Test Error');

    vi.mocked(useRouteError).mockReturnValue(mockError);

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(
      screen.getByText('Sorry, an unexpected error has occurred.')
    ).toBeInTheDocument();
    expect(screen.getByText('Test Error')).toBeInTheDocument();
    expect(screen.getByText('Home page')).toBeInTheDocument();
  });
});
