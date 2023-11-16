import Alert from '@/components/common/Alert';
import Pagination from '@/components/common/Pagination';
import Progress from '@/components/common/Progress';
import Nav from '@/components/Nav';
import { useAppParams, useAppSearchParams } from '@/hooks';
import { setLimit, useAppDispatch, useGetPageQuery } from '@/redux';
import { generateAppPath } from '@/utils';
import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ListLayout: FC = () => {
  const { page = '1', details } = useAppParams();
  const { search, limit } = useAppSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, isError, isLoading, isFetching, isUninitialized } =
    useGetPageQuery({
      search,
      page,
      limit,
    });

  const handlePrevClick = () => {
    navigate({ pathname: generateAppPath({ page: `${+page - 1}`, details }) });
  };

  const handleNextClick = () => {
    navigate({ pathname: generateAppPath({ page: `${+page + 1}`, details }) });
  };

  const handlePageChange = (page: string) => {
    navigate({ pathname: generateAppPath({ page, details }) });
  };

  const handlePageSizeChange = (limit: string) => {
    dispatch(setLimit(limit));
    navigate({ pathname: generateAppPath({ details }) });
  };

  const renderContent = () => {
    if (isUninitialized) {
      return null;
    }

    if (isLoading) {
      return <Progress />;
    }

    if (isError) {
      return (
        <div className="flex justify-center p-6">
          <Alert message="Something went wrong" severity="error" />
        </div>
      );
    }

    return (
      <>
        <Nav>
          <Pagination
            page={data.page}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </Nav>
        {isFetching ? (
          <Progress />
        ) : (
          <Outlet context={{ list: data.animals }} />
        )}
      </>
    );
  };

  return <div data-testid="list-layout">{renderContent()}</div>;
};

export default ListLayout;
