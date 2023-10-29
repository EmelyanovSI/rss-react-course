import { Component, ReactNode } from 'react';
import './index.css';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

class Button extends Component<ButtonProps> {
  render() {
    const { children, onClick } = this.props;

    return (
      <button type="button" className="button" onClick={onClick}>
        {children}
      </button>
    );
  }
}

export default Button;
