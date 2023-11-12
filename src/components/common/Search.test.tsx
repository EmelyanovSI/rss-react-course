import { fireEvent, render, screen } from '@/utils/test-utils';
import Search from './Search';

const mockOnSearch = vi.fn();

describe('Search component', () => {
  it('renders the search input with the correct placeholder and value', () => {
    render(<Search value="initialValue" onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText('Search...');

    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('initialValue');
  });

  it('calls onSearch with the trimmed search value when the form is submitted', () => {
    render(<Search value="initialValue" onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText('Search...');
    const searchForm = screen.getByRole('form');

    fireEvent.change(searchInput, { target: { value: '   new value   ' } });
    fireEvent.submit(searchForm);

    expect(mockOnSearch).toHaveBeenCalledWith('new value');
  });

  it('calls onSearch with the trimmed search value when the search button is clicked', () => {
    render(<Search value="initialValue" onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByTitle('Search');

    fireEvent.change(searchInput, { target: { value: '   new value   ' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('new value');
  });

  it('clears the search input and focuses it when the clear button is clicked', () => {
    render(<Search value="initialValue" onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText('Search...');
    const clearButton = screen.getByTitle('Clear');

    fireEvent.change(searchInput, { target: { value: 'new value' } });
    fireEvent.click(clearButton);

    expect(searchInput).toHaveValue('');
    expect(document.activeElement).toBe(searchInput);
  });
});
