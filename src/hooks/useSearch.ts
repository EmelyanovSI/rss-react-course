import { ACTION_TYPE } from '@/context/actions';
import { useAppContext, useAppReducer } from '@/context/hooks';
import { setSearchFromStorage } from '@/utils';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearch = () => {
  const { search } = useAppContext();
  const dispatch = useAppReducer();
  const [searchParams] = useSearchParams();

  const searchParam = searchParams.get('search') ?? search;

  useEffect(() => {
    setSearchFromStorage(searchParam);
    dispatch({ type: ACTION_TYPE.UPDATE_SEARCH, payload: searchParam });
  }, [dispatch, searchParam]);

  return search;
};
