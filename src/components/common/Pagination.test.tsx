import { Page } from '@/interfaces/animal';
import { fireEvent, render, screen } from '@/utils/test-utils';
import Pagination from './Pagination';

const mockPage: Page = {
  firstPage: false,
  lastPage: false,
  pageNumber: 2,
  totalPages: 5,
  pageSize: 10,
  numberOfElements: 10,
  totalElements: 50,
};

const mockHandlers = {
  onPrevClick: vi.fn(),
  onNextClick: vi.fn(),
  onPageChange: vi.fn(),
  onPageSizeChange: vi.fn(),
};

describe('Pagination component', () => {
  it('renders the pagination component with the correct page numbers', () => {
    render(<Pagination page={mockPage} {...mockHandlers} />);

    const pageNumbers = screen.getAllByRole('button', { name: /\d+/ });

    expect(pageNumbers).toHaveLength(5);
    expect(pageNumbers[0]).toHaveTextContent('1');
    expect(pageNumbers[1]).toHaveTextContent('2');
    expect(pageNumbers[2]).toHaveTextContent('3');
    expect(pageNumbers[3]).toHaveTextContent('4');
    expect(pageNumbers[4]).toHaveTextContent('5');
  });

  it('calls onPrevClick when the "Prev" button is clicked', () => {
    render(<Pagination page={mockPage} {...mockHandlers} />);

    const prevButton = screen.getByRole('button', { name: /Prev/ });
    fireEvent.click(prevButton);

    expect(mockHandlers.onPrevClick).toHaveBeenCalledTimes(1);
  });

  it('calls onNextClick when the "Next" button is clicked', () => {
    render(<Pagination page={mockPage} {...mockHandlers} />);

    const nextButton = screen.getByRole('button', { name: /Next/ });
    fireEvent.click(nextButton);

    expect(mockHandlers.onNextClick).toHaveBeenCalledTimes(1);
  });

  it('calls onPageChange when a page number button is clicked', () => {
    render(<Pagination page={mockPage} {...mockHandlers} />);

    const page2Button = screen.getByRole('button', { name: /2/ });
    fireEvent.click(page2Button);

    expect(mockHandlers.onPageChange).toHaveBeenCalledWith('2');
  });

  it('calls onPageChange when first page number button is clicked', () => {
    render(<Pagination page={mockPage} {...mockHandlers} />);

    const pageFirstButton = screen.getByRole('button', { name: /1/ });
    fireEvent.click(pageFirstButton);

    expect(mockHandlers.onPageChange).toHaveBeenCalledWith('2');
  });

  it('calls onPageChange when last page number button is clicked', () => {
    render(<Pagination page={mockPage} {...mockHandlers} />);

    const pageLastButton = screen.getByRole('button', { name: /5/ });
    fireEvent.click(pageLastButton);

    expect(mockHandlers.onPageChange).toHaveBeenCalledWith('2');
  });

  it('calls onPageSizeChange when the page size is changed', () => {
    render(<Pagination page={mockPage} {...mockHandlers} />);

    const pageSizeSelect = screen.getByRole('combobox');
    fireEvent.change(pageSizeSelect, { target: { value: '25' } });

    expect(mockHandlers.onPageSizeChange).toHaveBeenCalledWith('25');
  });
});
