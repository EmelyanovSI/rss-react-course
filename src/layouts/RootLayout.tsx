import Logo from '@/components/common/Logo';
import Search from '@/components/common/Search';
import ErrorBoundaryButton from '@/components/ErrorBoundaryButton';
import Header from '@/components/Header';
import { ACTION_TYPE } from '@/context/actions';
import { useAppContext, useAppReducer } from '@/context/hooks';
import { RouterParams } from '@/types';
import { getOriginalPath } from '@/utils';
import { FC } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const RootLayout: FC = () => {
  const { search } = useAppContext();
  const dispatch = useAppReducer();
  const { limit = '10', details = '' } = useParams<RouterParams>();
  const navigate = useNavigate();

  const handleSearch = (newSearch: string) => {
    dispatch({ type: ACTION_TYPE.UPDATE_SEARCH, payload: newSearch });
    const pathname = getOriginalPath(limit, details);
    navigate({ pathname });
  };

  const handleLogo = () => {
    handleSearch('');
  };

  return (
    <>
      <Header>
        <div className="flex gap-6">
          <Logo onClick={handleLogo} />
          <ErrorBoundaryButton />
        </div>
        <Search value={search} onSearch={handleSearch} />
      </Header>
      <Outlet />
    </>
  );
};

export default RootLayout;
