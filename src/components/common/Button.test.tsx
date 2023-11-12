import { render, screen, userEvent } from '@/utils/test-utils';
import Button from './Button';

const mockButtonChildren = 'Click me';
const mockButtonProps = {
  icon: 'arrow_forward',
  onClick: vi.fn(),
};

describe('Button component', () => {
  it('renders the button with the correct children and icon', () => {
    render(<Button {...mockButtonProps}>{mockButtonChildren}</Button>);

    const buttonElement = screen.getByText(mockButtonChildren);

    expect(buttonElement).toBeInTheDocument();
    expect(screen.getByText(mockButtonProps.icon)).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', async () => {
    const user = userEvent.setup();

    render(<Button {...mockButtonProps}>{mockButtonChildren}</Button>);

    await user.click(screen.getByText(mockButtonChildren));

    expect(mockButtonProps.onClick).toHaveBeenCalledTimes(1);
  });
});
