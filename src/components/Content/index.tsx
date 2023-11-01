import { FC, ReactNode } from 'react';
import { Status } from '../../constants/enums';
import { Loading } from '../../interfaces/Loading';
import Alert from '../Alert';
import Progress from '../Progress';

interface ContentProps extends Loading {
  children: ReactNode;
}

const Content: FC<ContentProps> = ({ status, message, children }) => {
  switch (status) {
    case Status.Idle:
      return null;
    case Status.Loading:
      return <Progress />;
    case Status.Failed:
      return (
        <div className="flex justify-center p-6">
          <Alert message={message} severity="error" />
        </div>
      );
    default:
      return <div className="flex justify-center p-6">{children}</div>;
  }
};

export default Content;
