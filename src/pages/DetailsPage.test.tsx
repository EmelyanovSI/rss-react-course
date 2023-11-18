import { useAppParams } from '@/hooks';
import { useGetAnimalQuery } from '@/redux';
import { render, screen } from '@/utils/test-utils';
import { MemoryRouter } from 'react-router-dom';
import DetailsPage from './DetailsPage';

const mockData = {
  animal: {
    name: 'Test Animal',
    uid: '123',
    earthAnimal: true,
    avian: true,
    earthInsect: true,
    feline: true,
    canine: true,
  },
};

const mockFlags = {
  isUninitialized: false,
  isError: false,
  isLoading: false,
  isFetching: false,
  refetch: vi.fn(),
};

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useOutletContext: vi.fn(),
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
    useGetAnimalQuery: vi.fn(),
  };
});

describe('DetailsPage Component', () => {
  it('renders animal details when status is success', () => {
    vi.mocked(useAppParams).mockReturnValue({ details: '123' });
    vi.mocked(useGetAnimalQuery).mockReturnValue({
      data: mockData,
      ...mockFlags,
    });

    render(
      <MemoryRouter>
        <DetailsPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Name: Test Animal')).toBeInTheDocument();
    expect(screen.getByText('ID: 123')).toBeInTheDocument();
    expect(screen.getByText('Is Animal: Yes')).toBeInTheDocument();
  });

  it('renders animal details when boolean values are false', () => {
    const falseMockData = {
      ...mockData,
      animal: {
        ...mockData.animal,
        earthAnimal: false,
        avian: false,
        earthInsect: false,
        feline: false,
        canine: false,
      },
    };

    vi.mocked(useAppParams).mockReturnValue({ details: '123' });
    vi.mocked(useGetAnimalQuery).mockReturnValue({
      data: falseMockData,
      ...mockFlags,
    });

    render(
      <MemoryRouter>
        <DetailsPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Name: Test Animal')).toBeInTheDocument();
    expect(screen.getByText('ID: 123')).toBeInTheDocument();
    expect(screen.getByText('Is Animal: No')).toBeInTheDocument();
  });

  it('renders loading indicator when status is loading', () => {
    vi.mocked(useAppParams).mockReturnValue({ details: '123' });
    vi.mocked(useGetAnimalQuery).mockReturnValue({
      data: mockData,
      ...mockFlags,
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <DetailsPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error message when status is failed', () => {
    vi.mocked(useAppParams).mockReturnValue({ details: '123' });
    vi.mocked(useGetAnimalQuery).mockReturnValue({
      data: mockData,
      ...mockFlags,
      isError: true,
    });

    render(
      <MemoryRouter>
        <DetailsPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders nothing when status is idle', () => {
    vi.mocked(useAppParams).mockReturnValue({ details: '123' });
    vi.mocked(useGetAnimalQuery).mockReturnValue({
      data: mockData,
      ...mockFlags,
      isUninitialized: true,
    });

    render(
      <MemoryRouter>
        <DetailsPage />
      </MemoryRouter>
    );

    expect(screen.queryByText('Name: Test Animal')).toBeNull();
  });
});
