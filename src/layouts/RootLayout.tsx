import Logo from '@/components/common/Logo';
import Search from '@/components/common/Search';
import ErrorBoundaryButton from '@/components/ErrorBoundaryButton';
import Header from '@/components/Header';
import { useAppParams, useAppSearchParams } from '@/hooks';
import {
  api,
  clearSearch,
  selectStatus,
  setSearch,
  useAppDispatch,
  useAppSelector,
} from '@/redux';
import { generateAppPath } from '@/utils';
import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const RootLayout: FC = () => {
  const { details } = useAppParams();
  const { search } = useAppSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(
    selectStatus(api.endpoints.getPage.name)
  );

  const handleSearch = (search: string) => {
    dispatch(setSearch(search));
    navigate({ pathname: generateAppPath({ details }) });
  };

  const handleLogo = () => {
    dispatch(clearSearch());
    navigate({ pathname: generateAppPath() });
  };

  return (
    <div data-testid="root-layout">
      <Header>
        <div className="flex gap-6">
          <Logo onClick={handleLogo} />
          <ErrorBoundaryButton />
        </div>
        <Search value={search} disabled={isLoading} onSearch={handleSearch} />
      </Header>
      <Outlet />
    </div>
  );
};

export default RootLayout;
