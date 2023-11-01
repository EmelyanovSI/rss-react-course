import classNames from 'classnames';
import { Component } from 'react';

interface IconButtonProps {
  onClick: () => void;
  name: string;
  title: string;
  disabled?: boolean;
}

class IconButton extends Component<IconButtonProps> {
  render() {
    const { name, title, disabled = false, onClick } = this.props;

    return (
      <button
        type="button"
        aria-label={title}
        title={title}
        name={name}
        disabled={disabled}
        onClick={onClick}
        className={classNames(
          'flex justify-center items-center whitespace-nowrap',
          'rounded-full h-10 w-10 select-none',
          'transition duration-500 ease-in-out',
          {
            'hover:bg-gray-100 active:bg-transparent cursor-pointer': !disabled,
          },
          { 'opacity-50 cursor-not-allowed': disabled }
        )}
      >
        <span className="material-symbols-outlined">{name}</span>
      </button>
    );
  }
}

export default IconButton;
