import { Component, ReactNode } from 'react';
import { Status } from '../constants/enums';
import { Loading } from '../interfaces/Loading';

interface ContentProps extends Loading {
  children: ReactNode;
}

class Content extends Component<ContentProps> {
  render() {
    const { children, status, message } = this.props;

    if (status === Status.Idle) {
      return null;
    }

    if (status === Status.Loading) {
      return <div>Loading...</div>;
    }

    if (status === Status.Failed) {
      return <div>{message}</div>;
    }

    return children;
  }
}

export default Content;
