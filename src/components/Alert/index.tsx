import classNames from 'classnames';
import { Component } from 'react';

interface AlertProps {
  message: string;
}

class Alert extends Component<AlertProps> {
  render() {
    const { message } = this.props;

    return (
      <div
        className={classNames(
          'flex items-center gap-2',
          'border rounded-full',
          'transition duration-500 ease-in-out hover:shadow',
          'h-10 px-6 bg-red-300'
        )}
      >
        <span className="material-symbols-outlined select-none">
          error_outline
        </span>
        <span>{message}</span>
      </div>
    );
  }
}

export default Alert;
