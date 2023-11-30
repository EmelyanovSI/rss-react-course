import { render, screen } from '@/utils/test-utils';
import CardList from './CardList';

const mockAnimalList = [
  {
    uid: '1',
    name: 'Lion',
    earthAnimal: true,
    avian: true,
    earthInsect: true,
    feline: true,
    canine: true,
  },
];

describe('CardList component', () => {
  it('renders the specified number of cards', () => {
    render(<CardList list={mockAnimalList} />);

    expect(screen.getAllByRole('article').length).toBe(mockAnimalList.length);
  });

  it('displays appropriate message if no cards are present', () => {
    render(<CardList list={[]} />);

    expect(screen.getByText('Not found.')).toBeInTheDocument();
  });

  it('calls onCardClick when a card is clickable', () => {
    const mockOnCardClick = vi.fn();

    render(<CardList list={mockAnimalList} onCardClick={mockOnCardClick} />);

    expect(mockOnCardClick).toHaveBeenCalledWith('1');
  });
});
