import { useAppParams } from '@/hooks';
import { Animal } from '@/interfaces/animal';
import { render, screen, userEvent } from '@/utils/test-utils';
import { MemoryRouter, useOutletContext } from 'react-router-dom';
import MainPage from './MainPage';

const mockAnimal = {
  name: 'Test Animal',
  uid: '123',
  earthAnimal: true,
  avian: true,
  earthInsect: true,
  feline: true,
  canine: true,
} as Animal;

const mockAppParams = { details: undefined };

const navigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useParams: vi.fn(),
    useNavigate: vi.fn(() => navigate),
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

describe('MainPage Component', () => {
  it('renders empty CardList component', () => {
    vi.mocked(useAppParams).mockReturnValue(mockAppParams);
    vi.mocked(useOutletContext).mockReturnValue({ list: [] });

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Not found.')).toBeInTheDocument();
  });

  it('renders the CardList component and calls navigate on card click', async () => {
    const user = userEvent.setup();
    vi.mocked(useAppParams).mockReturnValue(mockAppParams);
    vi.mocked(useOutletContext).mockReturnValue({ list: [mockAnimal] });

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();

    await user.click(card);
    expect(navigate).toHaveBeenCalledWith({ pathname: mockAnimal.uid });
  });

  it('calls navigate on CardList wrapper click', async () => {
    const user = userEvent.setup();
    vi.mocked(useAppParams).mockReturnValue({ details: 'details' });
    vi.mocked(useOutletContext).mockReturnValue({ list: [] });

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    const wrapper = screen.getByRole('listbox').parentElement;
    expect(wrapper).toBeInTheDocument();

    await user.click(wrapper!);
    expect(navigate).toHaveBeenCalledWith(
      { pathname: '..' },
      { relative: 'path' }
    );
  });
});
