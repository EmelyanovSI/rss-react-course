import { Status } from '@/constants';
import { useAppContext } from '@/context/hooks.tsx';
import { Animal } from '@/interfaces/animal.ts';
import { render, screen, userEvent } from '@/utils/test-utils';
import { MemoryRouter, useParams } from 'react-router-dom';
import ListPage from './ListPage';

const mockAnimal = {
  name: 'Test Animal',
  uid: '123',
  earthAnimal: true,
  avian: true,
  earthInsect: true,
  feline: true,
  canine: true,
} as Animal;

const mockAppContext = {
  list: [mockAnimal],
  search: '',
  status: Status.Succeeded,
  message: '',
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

vi.mock('@/context/hooks', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/context/hooks')>();
  return {
    ...mod,
    useAppContext: vi.fn(),
  };
});

describe('ListPage Component', () => {
  it('renders empty CardList component', () => {
    vi.mocked(useParams).mockReturnValueOnce({ details: undefined });
    vi.mocked(useAppContext).mockReturnValueOnce({
      ...mockAppContext,
      list: [],
    });

    render(
      <MemoryRouter>
        <ListPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Not found.')).toBeInTheDocument();
  });

  it('renders the CardList component and calls navigate on card click', async () => {
    const user = userEvent.setup();
    vi.mocked(useParams).mockReturnValueOnce({ details: undefined });
    vi.mocked(useAppContext).mockReturnValueOnce(mockAppContext);

    render(
      <MemoryRouter>
        <ListPage />
      </MemoryRouter>
    );

    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();

    await user.click(card);
    expect(navigate).toHaveBeenCalledWith({ pathname: mockAnimal.uid });
  });

  it('calls navigate on CardList wrapper click', async () => {
    const user = userEvent.setup();
    vi.mocked(useParams).mockReturnValueOnce({ details: 'details' });
    vi.mocked(useAppContext).mockReturnValueOnce(mockAppContext);

    render(
      <MemoryRouter>
        <ListPage />
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
