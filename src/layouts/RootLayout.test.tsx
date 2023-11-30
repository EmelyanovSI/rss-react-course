import { render, screen, userEvent } from '@/utils/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { expect } from 'vitest';
import RootLayout from './RootLayout';

const navigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useNavigate: vi.fn(() => navigate),
  };
});

describe('RootLayout Component', () => {
  it('renders correctly with default state', () => {
    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    );

    expect(screen.getByTestId('root-layout')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByAltText('Vite')).toBeInTheDocument();
    expect(screen.getByText('Throw an Error')).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('handles search correctly', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    );

    const searchInput = screen.getByRole('searchbox');
    const searchTerm = 'Test Search';

    await user.type(searchInput, searchTerm);
    expect(searchInput).toHaveValue(searchTerm);

    await user.click(screen.getByTitle('Search'));
    expect(navigate).toHaveBeenCalledOnce();

    vi.restoreAllMocks();
  });

  it('handles logo click correctly', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    );

    await user.click(screen.getByAltText('Vite'));
    expect(navigate).toHaveBeenCalledOnce();
  });
});
