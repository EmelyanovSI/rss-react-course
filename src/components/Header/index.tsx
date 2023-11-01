import classNames from 'classnames';
import { Component, ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

class Header extends Component<HeaderProps> {
  render() {
    return (
      <div
        className={classNames(
          'flex justify-between items-center border-b bg-white',
          'px-6 py-2 gap-6 sticky top-0'
        )}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Header;
