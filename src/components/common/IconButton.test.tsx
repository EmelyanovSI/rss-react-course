import { render, screen, userEvent } from '@/utils/test-utils';
import IconButton from './IconButton';

const mockIconButtonProps = {
  name: 'icon_name',
  title: 'Icon Title',
  disabled: false,
  onClick: vi.fn(),
  className: 'custom-class',
};

describe('IconButton component', () => {
  it('renders the icon button with the correct name, title, and styles', () => {
    render(<IconButton {...mockIconButtonProps} />);

    const buttonElement = screen.getByTitle(mockIconButtonProps.title);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('name', mockIconButtonProps.name);
    expect(buttonElement).toHaveAttribute('title', mockIconButtonProps.title);
    expect(buttonElement).toHaveClass(mockIconButtonProps.className);
  });

  it('calls onClick when the icon button is clicked', async () => {
    const user = userEvent.setup();

    render(<IconButton {...mockIconButtonProps} />);

    await user.click(screen.getByTitle(mockIconButtonProps.title));

    expect(mockIconButtonProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('applies styles and classes correctly based on disabled prop', () => {
    const { rerender } = render(<IconButton {...mockIconButtonProps} />);

    let buttonElement = screen.getByTitle(mockIconButtonProps.title);
    expect(buttonElement).not.toHaveClass('opacity-50');

    rerender(<IconButton {...mockIconButtonProps} disabled />);
    buttonElement = screen.getByTitle(mockIconButtonProps.title);
    expect(buttonElement).toHaveClass('opacity-50');
    expect(buttonElement).toHaveClass('cursor-not-allowed');
    expect(buttonElement).not.toHaveClass('hover:bg-gray-100');
  });
});
