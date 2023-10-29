import { Component, ReactNode } from 'react';
import { Status } from '../../constants/enums';
import { Loading } from '../../interfaces/Loading';
import Alert from '../Alert';
import Progress from '../Progress';
import './index.css';

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
      return (
        <div className="content">
          <Alert message={message} />
        </div>
      );
    }

    return <div className="content">{children}</div>;
  }
}

export default Content;
