import { fireEvent, render, screen } from '@/utils/test-utils';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>
    );

    const childElement = screen.getByText('Test Child');
    expect(childElement).toBeInTheDocument();
  });

  it('displays error message and refresh button when an error occurs', () => {
    const mockConsoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const ChildWithError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ChildWithError />
      </ErrorBoundary>
    );

    const errorMessage = screen.getByText(
      'Something went wrong. Please refresh the page.'
    );
    expect(errorMessage).toBeInTheDocument();

    const refreshButton = screen.getByRole('button', { name: /Refresh/ });
    expect(refreshButton).toBeInTheDocument();

    fireEvent.click(refreshButton);

    expect(mockConsoleError).toHaveBeenCalled();
  });
});
