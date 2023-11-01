import classNames from 'classnames';
import { FC } from 'react';

enum Severity {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info',
}

interface AlertProps {
  message: string;
  severity: keyof typeof Severity;
}

const Alert: FC<AlertProps> = ({ message, severity }) => {
  return (
    <div
      className={classNames(
        'flex items-center gap-2',
        'border rounded-full h-10 px-6',
        'transition duration-500 ease-in-out hover:shadow',
        { 'bg-green-100 text-green-700': severity === Severity.success },
        { 'bg-red-100 text-red-700': severity === Severity.error },
        { 'bg-yellow-100 text-yellow-700': severity === Severity.warning },
        { 'bg-blue-100 text-blue-700': severity === Severity.info }
      )}
    >
      <span className="material-symbols-outlined select-none">
        {severity === Severity.success && 'check_circle'}
        {severity === Severity.error && 'error_outline'}
        {severity === Severity.warning && 'warning'}
        {severity === Severity.info && 'info'}
      </span>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
