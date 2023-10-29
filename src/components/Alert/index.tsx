import { Component } from 'react';
import './index.css';

interface AlertProps {
  message: string;
}

class Alert extends Component<AlertProps> {
  render() {
    const { message } = this.props;

    return (
      <div className="error">
        <span className="material-icons">error_outline</span>
        <span>{message}</span>
      </div>
    );
  }
}

export default Alert;
