import Alert from '@/components/common/Alert';
import Pagination from '@/components/common/Pagination';
import Progress from '@/components/common/Progress';
import Nav from '@/components/Nav';
import { Status } from '@/constants';
import { useAppContext } from '@/context/hooks';
import useFetch from '@/hooks/useFetch';
import { RouterParams } from '@/types';
import { getOriginalPath } from '@/utils';
import { FC } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const ListLayout: FC = () => {
  const { page = '1', limit = '10', details = '' } = useParams<RouterParams>();
  const { status, message } = useAppContext();
  const navigate = useNavigate();
  const pagination = useFetch();

  const navigateTo = (newPage: string = page, newLimit: string = limit) => {
    const pathname = getOriginalPath(newLimit, details, newPage);
    navigate({ pathname });
  };

  const handlePrevClick = () => {
    navigateTo(`${+page - 1}`);
  };

  const handleNextClick = () => {
    navigateTo(`${+page + 1}`);
  };

  const handlePageChange = (page: number) => {
    navigateTo(`${page}`);
  };

  const handlePageSizeChange = (newLimit: number) => {
    navigateTo('1', `${newLimit}`);
  };

  if (status === Status.Idle) {
    return null;
  }

  if (status === Status.Loading) {
    return <Progress />;
  }

  if (status === Status.Failed) {
    return (
      <div className="flex justify-center p-6">
        <Alert message={message} severity="error" />
      </div>
    );
  }

  return (
    <>
      <Nav>
        <Pagination
          page={pagination}
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </Nav>
      <Outlet />
    </>
  );
};

export default ListLayout;
