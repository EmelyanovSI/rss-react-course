import { Page } from '@/interfaces/animal.ts';
import { useGetAnimalQuery, useGetPageQuery } from '@/redux';
import { userEvent } from '@/utils/test-utils';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import App from './App';

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

const mockPage = {
  page: {} as Page,
  animals: [mockAnimal.animal],
};

const mockFlags = {
  isUninitialized: false,
  isError: false,
  isLoading: false,
  isFetching: false,
  refetch: vi.fn(),
};

vi.mock('@/redux', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/redux')>();
  return {
    ...mod,
    useGetPageQuery: vi.fn(),
    useGetAnimalQuery: vi.fn(),
  };
});

describe('App Component', () => {
  it('renders without crashing', () => {
    vi.mocked(useGetPageQuery).mockReturnValue({
      data: mockPage,
      ...mockFlags,
    });

    const { container } = render(<App />);

    expect(container).not.toBeEmptyDOMElement();
  });

  it('renders a detailed card component when clicking on a card', async () => {
    const user = userEvent.setup();
    vi.mocked(useGetPageQuery).mockReturnValue({
      data: mockPage,
      ...mockFlags,
    });
    vi.mocked(useGetAnimalQuery).mockReturnValue({
      data: mockAnimal,
      ...mockFlags,
    });

    render(<App />);

    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();
    expect(screen.queryByText('Card details')).toBeNull();
    expect(useGetAnimalQuery).not.toBeCalled();

    await user.click(card);
    expect(screen.getByText('Card details')).toBeInTheDocument();
    expect(useGetAnimalQuery).toBeCalled();

    const close = screen.getByTitle('Close');

    await user.click(close);
    expect(screen.queryByText('Card details')).toBeNull();
  });
});
