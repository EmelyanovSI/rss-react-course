import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface NavProps {
  children?: ReactNode;
}

const Nav: FC<NavProps> = ({ children }) => {
  return (
    <nav
      role="navigation"
      className={classNames(
        'flex justify-between items-center bg-white',
        'px-6 py-2 gap-6 sticky top-0'
      )}
    >
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/uncontrolled"
            className="hover:text-gray-300 transition duration-300"
          >
            Uncontrolled Form
          </Link>
        </li>
        <li>
          <Link
            to="/hook"
            className="hover:text-gray-300 transition duration-300"
          >
            Hook Form
          </Link>
        </li>
      </ul>
      {children}
    </nav>
  );
};

export default Nav;
