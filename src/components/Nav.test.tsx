import { render, screen } from '@/utils/test-utils';
import Nav from './Nav';

describe('Nav component', () => {
  test('renders the navigation component with the correct styles', () => {
    render(<Nav>Test Children</Nav>);

    const navElement = screen.getByRole('navigation');
    const childrenElement = screen.getByText('Test Children');

    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass('sticky');
    expect(navElement).toHaveClass('top-0');

    expect(childrenElement).toBeInTheDocument();
    expect(childrenElement.textContent).toBe('Test Children');
  });
});
