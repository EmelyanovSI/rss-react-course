import { Status } from '@/constants';
import { render, screen } from '@/utils/test-utils';
import { MemoryRouter, useOutletContext } from 'react-router-dom';
import CardPage from './CardPage';

const mockContext = {
  animal: {
    name: 'Test Animal',
    uid: '123',
    earthAnimal: true,
    avian: true,
    earthInsect: true,
    feline: true,
    canine: true,
  },
  status: Status.Succeeded,
  message: 'Test Message',
};

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useOutletContext: vi.fn(),
  };
});

describe('CardPage Component', () => {
  it('renders animal details when status is success', () => {
    vi.mocked(useOutletContext).mockReturnValue(mockContext);

    render(
      <MemoryRouter>
        <CardPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Name: Test Animal')).toBeInTheDocument();
    expect(screen.getByText('ID: 123')).toBeInTheDocument();
    expect(screen.getByText('Is Animal: Yes')).toBeInTheDocument();
  });

  it('renders animal details when boolean values are false', () => {
    const falseMockContext = {
      ...mockContext,
      animal: {
        ...mockContext.animal,
        earthAnimal: false,
        avian: false,
        earthInsect: false,
        feline: false,
        canine: false,
      },
    };

    vi.mocked(useOutletContext).mockReturnValue(falseMockContext);

    render(
      <MemoryRouter>
        <CardPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Name: Test Animal')).toBeInTheDocument();
    expect(screen.getByText('ID: 123')).toBeInTheDocument();
    expect(screen.getByText('Is Animal: No')).toBeInTheDocument();
  });

  it('renders loading indicator when status is loading', () => {
    const loadingContext = { ...mockContext, status: Status.Loading };
    vi.mocked(useOutletContext).mockReturnValue(loadingContext);

    render(
      <MemoryRouter>
        <CardPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error message when status is failed', () => {
    const errorContext = { ...mockContext, status: Status.Failed };
    vi.mocked(useOutletContext).mockReturnValue(errorContext);

    render(
      <MemoryRouter>
        <CardPage />
      </MemoryRouter>
    );

    expect(screen.getByText(mockContext.message)).toBeInTheDocument();
  });

  it('renders nothing when status is idle', () => {
    const idleContext = { ...mockContext, status: Status.Idle };
    vi.mocked(useOutletContext).mockReturnValue(idleContext);

    render(
      <MemoryRouter>
        <CardPage />
      </MemoryRouter>
    );

    expect(screen.queryByText('Name: Test Animal')).toBeNull();
  });
});
