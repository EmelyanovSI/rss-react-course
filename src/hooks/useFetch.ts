import { ACTION_TYPE } from '@/context/actions';
import { useAppReducer } from '@/context/hooks';
import { Page } from '@/interfaces/animal';
import { fetchPage } from '@/services/animal';
import { RouterParams } from '@/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSearch from './useSearch';

const useFetch = () => {
  const { page = '1', limit = '10' } = useParams<RouterParams>();
  const dispatch = useAppReducer();
  const [pagination, setPagination] = useState<Page>({} as Page);
  const search = useSearch();

  useEffect(() => {
    dispatch({ type: ACTION_TYPE.GET_LIST_STARTED });
    fetchPage(search, +page - 1, limit)
      .then((value) => {
        setPagination(value.page);
        dispatch({
          type: ACTION_TYPE.GET_LIST_SUCCESS,
          payload: value.animals,
        });
      })
      .catch((reason) => {
        dispatch({
          type: ACTION_TYPE.GET_LIST_FAILURE,
          payload: reason.message,
        });
      });
  }, [dispatch, limit, page, search]);

  return pagination;
};

export default useFetch;
