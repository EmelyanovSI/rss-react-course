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
  renderContent() {
    const { status, message, children } = this.props;

    switch (status) {
      case Status.Idle:
        return null;
      case Status.Loading:
        return <Progress />;
      case Status.Failed:
        return (
          <div className="content">
            <Alert message={message} />
          </div>
        );
      default:
        return <div className="content">{children}</div>;
    }
  }

  render() {
    return this.renderContent();
  }
}

export default Content;
