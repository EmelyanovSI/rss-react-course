import Alert from '@/components/common/Alert';
import Pagination from '@/components/common/Pagination';
import Progress from '@/components/common/Progress';
import Nav from '@/components/Nav';
import { Status } from '@/constants';
import { ACTION_TYPE } from '@/context/actions';
import { useAppContext, useAppReducer } from '@/context/hooks';
import { Page } from '@/interfaces/animal';
import { fetchPage } from '@/services/animal';
import { RouterParams } from '@/types';
import { getOriginalPath, setSearchFromStorage } from '@/utils';
import { FC, useEffect, useState } from 'react';
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

const ListLayout: FC = () => {
  const { page = '1', limit = '10', details = '' } = useParams<RouterParams>();
  const [pagination, setPagination] = useState<Page | null>(null);
  const navigate = useNavigate();
  const { search, status, message } = useAppContext();
  const dispatch = useAppReducer();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (status === Status.Idle) {
      setPagination(null);
      dispatch({ type: ACTION_TYPE.GET_LIST_STARTED });
      const searchParam = searchParams.get('search') ?? search;
      setSearchFromStorage(searchParam);
      dispatch({ type: ACTION_TYPE.UPDATE_SEARCH, payload: searchParam });
      fetchPage(searchParam ?? search, +page - 1, limit)
        .then((value) => {
          setPagination(value.page);
          dispatch({
            type: ACTION_TYPE.GET_LIST_SUCCESS,
            payload: value.animals,
          });
        })
        .catch((reason) => {
          setPagination(null);
          dispatch({
            type: ACTION_TYPE.GET_LIST_FAILURE,
            payload: reason,
          });
        });
    }
  }, [dispatch, limit, page, search, searchParams, setSearchParams, status]);

  const navigateTo = (newPage: string = page, newLimit: string = limit) => {
    dispatch({ type: ACTION_TYPE.RESET_LIST });
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
      <div className="flex justify-center p-6 w-full">
        <Alert message={message} severity="error" />
        <Outlet />
      </div>
    );
  }

  return (
    <>
      <Nav>
        {pagination && (
          <Pagination
            page={pagination}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </Nav>
      <Outlet />
    </>
  );
};

export default ListLayout;
