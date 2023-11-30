import { Severity } from '@/constants';
import { render, screen } from '@/utils/test-utils';
import Alert from './Alert';

const mockAlertProps = {
  message: 'Test message',
  severity: 'success' as Severity,
};

describe('Alert component', () => {
  it('renders the alert with the correct message', () => {
    render(<Alert {...mockAlertProps} />);

    const alertElement = screen.getByText(mockAlertProps.message);

    expect(alertElement).toBeInTheDocument();
  });

  it('renders different severities correctly', () => {
    const severities = ['success', 'error', 'warning', 'info'];
    const colors = ['green', 'red', 'yellow', 'blue'];

    severities.forEach((severity, i) => {
      render(
        <Alert
          message={`Test ${severity} message`}
          severity={severity as Severity}
        />
      );

      const alertElement = screen.getByText(`Test ${severity} message`);
      expect(alertElement.parentElement).toBeInTheDocument();
      expect(alertElement.parentElement).toHaveClass(
        `bg-${colors[i]}-100 text-${colors[i]}-700`
      );
    });
  });

  test('displays the correct icon based on severity', () => {
    const severities = ['success', 'error', 'warning', 'info'];
    const icons = ['check_circle', 'error_outline', 'warning', 'info'];

    severities.forEach((severity, i) => {
      render(
        <Alert
          message={`Test ${severity} message`}
          severity={severity as Severity}
        />
      );

      const alertElement = screen.getByText(icons[i]);
      expect(alertElement).toBeInTheDocument();
      expect(alertElement).toHaveClass('material-symbols-outlined');
    });
  });
});
