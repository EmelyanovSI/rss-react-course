import { useAppParams } from '@/hooks';
import { Page } from '@/interfaces/animal';
import { useGetPageQuery } from '@/redux';
import { render, screen, userEvent } from '@/utils/test-utils';
import { MemoryRouter } from 'react-router-dom';
import MainLayout from './MainLayout';

const mockParams = {
  page: '1',
  details: undefined,
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

const mockFlags = {
  isUninitialized: false,
  isError: false,
  isLoading: false,
  isFetching: false,
  refetch: vi.fn(),
};

const navigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useParams: vi.fn(),
    useNavigate: vi.fn(() => navigate),
  };
});

vi.mock('@/hooks', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/hooks')>();
  return {
    ...mod,
    useAppParams: vi.fn(),
  };
});

vi.mock('@/redux', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/redux')>();
  return {
    ...mod,
    useGetPageQuery: vi.fn(),
  };
});

describe('MainLayout Component', () => {
  it('renders idle state', () => {
    vi.mocked(useAppParams).mockReturnValue(mockParams);
    vi.mocked(useGetPageQuery).mockReturnValue({
      data: { page: mockPagination, animals: [] },
      ...mockFlags,
      isUninitialized: true,
    });

    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );

    const container = screen.getByTestId('main-layout');

    expect(container).toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });

  it('renders loading state', () => {
    vi.mocked(useAppParams).mockReturnValue(mockParams);
    vi.mocked(useGetPageQuery).mockReturnValue({
      data: { page: mockPagination, animals: [] },
      ...mockFlags,
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const errorMessage = 'Something went wrong';
    vi.mocked(useAppParams).mockReturnValue(mockParams);
    vi.mocked(useGetPageQuery).mockReturnValue({
      data: { page: mockPagination, animals: [] },
      ...mockFlags,
      isError: true,
    });

    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );

    expect(screen.getByRole('alert')).toHaveTextContent(errorMessage);
  });

  it('renders success state', () => {
    vi.mocked(useAppParams).mockReturnValue(mockParams);
    vi.mocked(useGetPageQuery).mockReturnValue({
      data: { page: mockPagination, animals: [] },
      ...mockFlags,
    });

    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('calls navigate functions correctly', async () => {
    const user = userEvent.setup();
    vi.mocked(useAppParams).mockReturnValue(mockParams);
    vi.mocked(useGetPageQuery).mockReturnValue({
      data: { page: mockPagination, animals: [] },
      ...mockFlags,
    });

    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );

    await user.click(screen.getByText('Next'));
    expect(navigate).toHaveBeenCalledWith({ pathname: '/page/2' });

    await user.click(screen.getByText('3'));
    expect(navigate).toHaveBeenCalledWith({ pathname: '/page/3' });

    await user.click(screen.getByText('Prev'));
    expect(navigate).toHaveBeenCalledWith({ pathname: '/page/2' });

    await user.selectOptions(screen.getByRole('combobox'), '25');
    expect(navigate).toHaveBeenCalledWith({ pathname: '/page/1' });
  });
});
