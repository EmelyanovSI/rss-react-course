import classNames from 'classnames';
import { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title: string;
  onClick?: () => void;
}

const Card: FC<CardProps> = ({ title, children, onClick }) => {
  return (
    <div
      className={classNames(
        'flex flex-col place-content-between border rounded-lg',
        'transition duration-500 ease-in-out',
        { 'active:shadow-none hover:shadow-md hover:text-red-500': onClick },
        'bg-red-50 w-64 p-2 gap-6 cursor-pointer'
      )}
      onClick={onClick}
    >
      <h2 className="font-medium text-black">{title}</h2>
      {children}
    </div>
  );
};

export default Card;
