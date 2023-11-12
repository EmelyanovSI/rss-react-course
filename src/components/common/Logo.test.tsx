import { render, screen, userEvent } from '@/utils/test-utils';
import Logo from './Logo';

describe('Logo component', () => {
  it('renders the logo and text correctly', () => {
    render(<Logo />);

    const logoElement = screen.getByAltText('Vite');
    const textElement = screen.getByText('React Course · RS School');

    expect(logoElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  it('calls onClick when the logo container is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    render(<Logo onClick={mockOnClick} />);

    await user.click(screen.getByAltText('Vite'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies styles and classes correctly based on onClick prop', () => {
    const { container, rerender } = render(<Logo />);
    const logoContainer = container.firstChild;

    expect(logoContainer).not.toHaveClass('cursor-pointer');
    expect(logoContainer).not.toHaveClass('select-none');
    expect(logoContainer).not.toHaveClass('active:underline');

    const mockOnClick = vi.fn();
    rerender(<Logo onClick={mockOnClick} />);

    expect(logoContainer).toHaveClass('cursor-pointer');
    expect(logoContainer).toHaveClass('select-none');
    expect(logoContainer).toHaveClass('active:underline');
  });
});
