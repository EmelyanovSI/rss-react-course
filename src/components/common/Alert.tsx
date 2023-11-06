import classNames from 'classnames';
import { FC } from 'react';
import { Severity } from '@/constants';

interface AlertProps {
  message: string;
  severity: keyof typeof Severity;
}

const Alert: FC<AlertProps> = ({ message, severity }) => {
  const { success, error, warning, info } = Severity;
  return (
    <div
      className={classNames(
        'flex items-center gap-2',
        'border rounded-full h-10 px-6',
        'transition duration-500 ease-in-out hover:shadow',
        { 'bg-green-100 text-green-700': severity === success },
        { 'bg-red-100 text-red-700': severity === error },
        { 'bg-yellow-100 text-yellow-700': severity === warning },
        { 'bg-blue-100 text-blue-700': severity === info }
      )}
    >
      <span className="material-symbols-outlined select-none">
        {severity === success && 'check_circle'}
        {severity === error && 'error_outline'}
        {severity === warning && 'warning'}
        {severity === info && 'info'}
      </span>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
