import classNames from 'classnames';
import { FC, ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <div
      role="heading"
      className={classNames(
        'flex justify-between items-center border-b bg-white',
        'px-6 py-2 gap-6 sticky top-0'
      )}
    >
      {children}
    </div>
  );
};

export default Header;
