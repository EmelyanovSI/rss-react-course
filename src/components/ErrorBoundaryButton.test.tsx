import * as utils from '@/utils';
import { render, screen, userEvent } from '@/utils/test-utils';
import ErrorBoundaryButton from './ErrorBoundaryButton';

describe('ErrorBoundaryButton component', () => {
  const originalConsoleError = console.error;

  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('renders the error boundary button component with the correct text', () => {
    render(<ErrorBoundaryButton />);

    const buttonElement = screen.getByRole('button', {
      name: /Throw an Error/,
    });
    expect(buttonElement).toBeInTheDocument();
  });

  test('triggers an error when the button is clicked', async () => {
    const user = userEvent.setup();
    const mockTriggerError = vi.spyOn(utils, 'triggerError').mockReturnThis();

    render(<ErrorBoundaryButton />);

    await user.click(screen.getByRole('button', { name: /Throw an Error/ }));

    expect(mockTriggerError).toHaveBeenCalled();

    vi.restoreAllMocks();
  });
});
