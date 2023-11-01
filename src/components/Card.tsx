import classNames from 'classnames';
import { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title: string;
}

const Card: FC<CardProps> = ({ title, children }) => {
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
};

export default Card;
