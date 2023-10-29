import { Component, ReactNode } from 'react';
import './index.css';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return (
      <button type="button" className="button" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
