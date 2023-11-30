import { Status } from '@/constants';
import { AppContextValue } from '@/context';
import { useAppContext } from '@/context/hooks';
import { useFetch } from '@/hooks';
import { Page } from '@/interfaces/animal.ts';
import { render, screen, userEvent } from '@/utils/test-utils';
import { MemoryRouter, useParams } from 'react-router-dom';
import ListLayout from './ListLayout';

const mockAppContext: AppContextValue = {
  status: Status.Idle,
  search: '',
  message: '',
  list: [],
};

const mockParams = {
  page: '1',
  limit: '10',
};

const mockPagination = {
  totalElements: 100,
  numberOfElements: 10,
  pageSize: 10,
  lastPage: false,
  firstPage: false,
  totalPages: 10,
  pageNumber: 1,
} as Page;

const navigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useParams: vi.fn(),
    useNavigate: vi.fn(() => navigate),
  };
});

vi.mock('@/context/hooks', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/context/hooks')>();
  return {
    ...mod,
    useAppContext: vi.fn(),
  };
});

vi.mock('@/hooks', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/hooks')>();
  return {
    ...mod,
    useFetch: vi.fn(),
  };
});

describe('ListLayout', () => {
  it('renders idle state', () => {
    vi.mocked(useParams).mockReturnValue(mockParams);
    vi.mocked(useFetch).mockReturnValue(mockPagination);
    vi.mocked(useAppContext).mockReturnValue(mockAppContext);

    render(
      <MemoryRouter>
        <ListLayout />
      </MemoryRouter>
    );

    const container = screen.getByTestId('list-layout');

    expect(container).toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });

  it('renders loading state', () => {
    vi.mocked(useParams).mockReturnValue(mockParams);
    vi.mocked(useFetch).mockReturnValue(mockPagination);
    vi.mocked(useAppContext).mockReturnValue({
      ...mockAppContext,
      status: Status.Loading,
    });

    render(
      <MemoryRouter>
        <ListLayout />
      </MemoryRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const errorMessage = 'An error occurred!';
    vi.mocked(useParams).mockReturnValue(mockParams);
    vi.mocked(useFetch).mockReturnValue(mockPagination);
    vi.mocked(useAppContext).mockReturnValueOnce({
      ...mockAppContext,
      status: Status.Failed,
      message: errorMessage,
    });

    render(
      <MemoryRouter>
        <ListLayout />
      </MemoryRouter>
    );

    expect(screen.getByRole('alert')).toHaveTextContent(errorMessage);
  });

  it('renders success state', () => {
    vi.mocked(useParams).mockReturnValue(mockParams);
    vi.mocked(useFetch).mockReturnValue(mockPagination);
    vi.mocked(useAppContext).mockReturnValueOnce({
      ...mockAppContext,
      status: Status.Succeeded,
    });

    render(
      <MemoryRouter>
        <ListLayout />
      </MemoryRouter>
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('calls navigate functions correctly', async () => {
    const user = userEvent.setup();
    vi.mocked(useParams).mockReturnValue(mockParams);
    vi.mocked(useFetch).mockReturnValue(mockPagination);
    vi.mocked(useAppContext).mockReturnValueOnce({
      ...mockAppContext,
      status: Status.Succeeded,
    });

    render(
      <MemoryRouter>
        <ListLayout />
      </MemoryRouter>
    );

    await user.click(screen.getByText('Next'));
    expect(navigate).toHaveBeenCalledWith({ pathname: '/page/2/limit/10' });

    await user.click(screen.getByText('3'));
    expect(navigate).toHaveBeenCalledWith({ pathname: '/page/3/limit/10' });

    await user.click(screen.getByText('Prev'));
    expect(navigate).toHaveBeenCalledWith({ pathname: '/page/2/limit/10' });

    await user.selectOptions(screen.getByRole('combobox'), '25');
    expect(navigate).toHaveBeenCalledWith({ pathname: '/page/1/limit/25' });
  });
});
