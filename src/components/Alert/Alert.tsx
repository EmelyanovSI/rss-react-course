import { Component } from 'react';
import './Alert.css';

interface ContentProps {
  message: string;
}

class Alert extends Component<ContentProps> {
  render() {
    return (
      <div className="error">
        <span className="material-icons">error_outline</span>
        <span>{this.props.message}</span>
      </div>
    );
  }
}

export default Alert;
