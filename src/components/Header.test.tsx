import { render, screen } from '@/utils/test-utils';
import Header from './Header';

describe('Header component', () => {
  test('renders the header component with the correct styles', () => {
    render(<Header>Test Children</Header>);

    const headerElement = screen.getByRole('heading');
    const childrenElement = screen.getByText('Test Children');

    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass('sticky');
    expect(headerElement).toHaveClass('top-0');

    expect(childrenElement).toBeInTheDocument();
    expect(childrenElement.textContent).toBe('Test Children');
  });
});
