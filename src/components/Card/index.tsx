import classNames from 'classnames';
import { Component, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title: string;
}

class Card extends Component<CardProps> {
  render() {
    const { title, children } = this.props;

    return (
      <div
        className={classNames(
          'flex flex-col place-content-between',
          'transition duration-500 ease-in-out',
          'border rounded-lg hover:shadow-md hover:text-red-500',
          'bg-red-50 w-64 p-2 gap-6'
        )}
      >
        <h2 className="font-medium text-black">{title}</h2>
        {children}
      </div>
    );
  }
}

export default Card;
