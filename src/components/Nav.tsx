import classNames from 'classnames';
import { FC, ReactNode } from 'react';

interface NavProps {
  children: ReactNode;
}

const Nav: FC<NavProps> = ({ children }) => {
  return (
    <div
      className={classNames(
        'flex justify-end items-center bg-white',
        'px-6 py-2 gap-6 sticky top-0'
      )}
    >
      {children}
    </div>
  );
};

export default Nav;
