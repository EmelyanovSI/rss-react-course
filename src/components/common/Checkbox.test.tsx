import { render, screen, userEvent } from '@/utils/test-utils';
import Checkbox from './Checkbox';

describe('Checkbox component', () => {
  test('renders Checkbox with default state', () => {
    const { getByLabelText, getByText } = render(
      <Checkbox label="Test Checkbox" checked={false} onChange={() => {}} />
    );

    const checkbox = getByLabelText('Test Checkbox') as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);

    const label = getByText('Test Checkbox');
    expect(label).toBeInTheDocument();
  });

  test('handles checkbox change correctly', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Checkbox label="Test Checkbox" checked={false} onChange={onChange} />
    );

    await user.click(screen.getByText('Test Checkbox'));

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
