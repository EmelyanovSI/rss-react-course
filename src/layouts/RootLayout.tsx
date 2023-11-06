import { FC } from 'react';
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import Search from '@/components/common/Search';
import ErrorBoundaryButton from '@/components/ErrorBoundaryButton';
import Header from '@/components/Header';
import { RouterParams } from '@/constants';
import {
  getOriginalPath,
  getSearchFromStorage,
  setSearchFromStorage,
} from '@/utils';

const RootLayout: FC = () => {
  const { limit = '10', details = '' } = useParams<RouterParams>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const getSearchParam = () => {
    return searchParams.get('search') ?? '';
  };

  const setSearchParam = (search?: string) => {
    if (search) {
      searchParams.set('search', search);
    } else {
      searchParams.delete('search');
    }
  };

  const handleSearch = (search: string) => {
    setSearchParam(search);
    setSearchFromStorage(search);
    const pathname = getOriginalPath(limit, details);
    navigate({ pathname, search: `${searchParams}` });
  };

  const search = getSearchParam();
  if (search) {
    setSearchFromStorage(search);
  }

  return (
    <>
      <Header>
        <ErrorBoundaryButton />
        <Search value={getSearchFromStorage()} onSearch={handleSearch} />
      </Header>
      <Outlet />
    </>
  );
};

export default RootLayout;
