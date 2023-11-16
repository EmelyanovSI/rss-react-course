import Alert from '@/components/common/Alert';
import Checkbox from '@/components/common/Checkbox';
import Pagination from '@/components/common/Pagination';
import Progress from '@/components/common/Progress';
import Nav from '@/components/Nav';
import { ViewMode } from '@/constants';
import { useAppParams, useAppSearchParams } from '@/hooks';
import {
  setLimit,
  toggleMode,
  useAppDispatch,
  useAppSelector,
  useGetPageQuery,
} from '@/redux';
import { generateAppPath } from '@/utils';
import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ListLayout: FC = () => {
  const { page = '1', details } = useAppParams();
  const { search, limit } = useAppSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mode = useAppSelector((state) => state.app.mode);
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

  const handleCheckboxChange = () => {
    dispatch(toggleMode());
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
          <Checkbox
            label="Compact"
            checked={mode === ViewMode.Compact}
            onChange={handleCheckboxChange}
          />
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
