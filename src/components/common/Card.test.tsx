import { render, screen, userEvent } from '@/utils/test-utils';
import Card from './Card';

describe('Card component', () => {
  it('renders the relevant card data', () => {
    const title = 'Test Card';
    const content = 'Card Content';

    render(<Card title={title}>{content}</Card>);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('calls onClick when clicking on a card component', async () => {
    const title = 'Test Card';
    const content = 'Card Content';
    const mockOnClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Card title={title} onClick={mockOnClick}>
        {content}
      </Card>
    );

    await user.click(screen.getByText(title));

    expect(mockOnClick).toHaveBeenCalled();
  });
});
