import { Component, ReactNode } from 'react';
import './index.css';

interface HeaderProps {
  children: ReactNode;
}

class Header extends Component<HeaderProps> {
  render() {
    return <div className="header">{this.props.children}</div>;
  }
}

export default Header;
