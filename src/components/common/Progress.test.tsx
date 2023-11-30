import { render, screen } from '@/utils/test-utils';
import Progress from './Progress';

describe('Progress component', () => {
  test('renders the progress bar with the correct structure', () => {
    render(<Progress />);

    const progressBarElement = screen.getByRole('progressbar');
    const progressIndicatorElement = progressBarElement.firstChild;

    expect(progressBarElement).toBeInTheDocument();
    expect(progressBarElement).toHaveClass('h-1');
    expect(progressBarElement).toHaveClass('bg-red-100');

    expect(progressIndicatorElement).toBeInTheDocument();
    expect(progressIndicatorElement).toHaveClass('h-full');
    expect(progressIndicatorElement).toHaveClass('bg-red-300');
    expect(progressIndicatorElement).toHaveClass('animate-progress');
  });
});
