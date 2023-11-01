import { Component } from 'react';
import Button from '../Button';
import { ErrorBoundaryState } from '../ErrorBoundary';

class ErrorButton extends Component<object, ErrorBoundaryState> {
  constructor(props: object) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  triggerError = () => {
    throw new Error('This is a test error');
  };

  handleThrowError = () => {
    this.setState({ hasError: true });
  };

  componentDidUpdate() {
    if (this.state.hasError) {
      this.triggerError();
    }
  }

  render() {
    return <Button onClick={this.handleThrowError}>Throw an Error</Button>;
  }
}

export default ErrorButton;
