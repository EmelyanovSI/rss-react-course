import { Status } from '@/constants';
import { useAppContext } from '@/context/hooks.tsx';
import { fetchAnimal } from '@/services/animal.ts';
import { userEvent } from '@/utils/test-utils.ts';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import App from './App';

const mockAppContext = {
  status: Status.Succeeded,
  message: '',
  search: '',
  list: [
    {
      uid: '123',
      name: 'Name',
      canine: true,
      feline: true,
      avian: true,
      earthInsect: true,
      earthAnimal: true,
    },
  ],
};

const mockAnimal = {
  animal: {
    uid: '123',
    name: 'Name',
    earthAnimal: true,
    earthInsect: true,
    avian: true,
    canine: true,
    feline: true,
  },
};

vi.mock('@/context/hooks', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/context/hooks')>();
  return {
    ...mod,
    useAppContext: vi.fn(),
  };
});

vi.mock('@/services/animal', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/services/animal')>();
  return {
    ...mod,
    fetchAnimal: vi.fn(),
  };
});

describe('App Component', () => {
  it('renders without crashing', () => {
    vi.mocked(useAppContext).mockReturnValue(mockAppContext);

    const { container } = render(<App />);

    expect(container).not.toBeEmptyDOMElement();
  });

  it('renders a detailed card component when clicking on a card', async () => {
    const user = userEvent.setup();
    vi.mocked(fetchAnimal).mockResolvedValue(mockAnimal);
    vi.mocked(useAppContext).mockReturnValue(mockAppContext);

    render(<App />);

    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();
    expect(screen.queryByText('Card details')).toBeNull();
    expect(fetchAnimal).not.toBeCalled();

    await user.click(card);
    expect(screen.getByText('Card details')).toBeInTheDocument();
    expect(fetchAnimal).toBeCalled();

    const close = screen.getByTitle('Close');

    await user.click(close);
    expect(screen.queryByText('Card details')).toBeNull();
  });
});
