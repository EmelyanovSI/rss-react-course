import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorBoundaryButton from '../components/ErrorBoundaryButton';
import Header from '../components/Header';
import Search from '../components/Search';
import { getSearchValue, setSearchValue } from '../utils';

const RootLayout: FC = () => {
  const value = getSearchValue();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`${value}/page`);
  }, [navigate, value]);

  const handleSearch = (searchValue: string) => {
    setSearchValue(searchValue);
    navigate(`${searchValue}/page`);
  };

  return (
    <ErrorBoundary>
      <Header>
        <ErrorBoundaryButton />
        <Search value={value} onSearch={handleSearch} />
      </Header>
      <Outlet />
    </ErrorBoundary>
  );
};

export default RootLayout;
