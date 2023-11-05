import { FC, ReactNode } from 'react';
import { Status } from '../constants/enums';
import { Loading } from '../interfaces/Loading';
import Alert from './Alert';
import Nav from './Nav';
import Pagination from './Pagination';
import Progress from './Progress';

interface ContentProps extends Loading {
  children: ReactNode;
}

const Content: FC<ContentProps> = ({ status, message, children }) => {
  const renderContent = () => {
    switch (status) {
      case Status.Idle:
        return null;
      case Status.Loading:
        return <Progress />;
      case Status.Failed:
        return <Alert message={message} severity="error" />;
      default:
        return children;
    }
  };

  return (
    <>
      <Nav>
        <Pagination />
      </Nav>
      <div className="flex justify-center p-6">{renderContent()}</div>
    </>
  );
};

export default Content;
