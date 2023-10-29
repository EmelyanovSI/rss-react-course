import { Component, ReactNode } from 'react';
import { Status } from '../../constants/enums';
import { Loading } from '../../interfaces/Loading';
import Progress from '../Progress/Progress';

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
      return <Progress />;
    }

    if (status === Status.Failed) {
      return <div>{message}</div>;
    }

    return children;
  }
}

export default Content;
