import classNames from 'classnames';
import { Component, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  icon: string;
  onClick: () => void;
}

class Button extends Component<ButtonProps> {
  render() {
    const { children, icon, onClick } = this.props;

    return (
      <button
        type="button"
        className={classNames(
          'flex items-center gap-1',
          'rounded-full whitespace-nowrap',
          'hover:shadow active:shadow-none',
          'transition duration-500 ease-in-out',
          'bg-red-100 h-10 px-6 select-none'
        )}
        onClick={onClick}
      >
        <span
          className={classNames(
            'material-symbols-outlined',
            '-ml-2 text-base cursor-pointer'
          )}
        >
          {icon}
        </span>
        <label className="cursor-pointer">{children}</label>
      </button>
    );
  }
}

export default Button;
