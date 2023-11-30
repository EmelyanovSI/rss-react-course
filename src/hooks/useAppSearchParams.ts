import { setLimit, setSearch, useAppDispatch, useAppSelector } from '@/redux';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useAppSearchParams = () => {
  const searchValue = useAppSelector((state) => state.app.search);
  const limitValue = useAppSelector((state) => state.app.limit);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search') ?? searchValue;
  const limit = searchParams.get('limit') ?? limitValue;

  useEffect(() => {
    if (search !== searchValue) {
      dispatch(setSearch(search));
    }
  }, [dispatch, searchValue, search]);

  useEffect(() => {
    if (limit !== limitValue) {
      dispatch(setLimit(limit));
    }
  }, [dispatch, limitValue, limit]);

  return { search, limit };
};
