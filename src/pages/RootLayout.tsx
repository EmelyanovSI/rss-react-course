import { FC, useEffect } from 'react';
import { generatePath, Outlet, useNavigate, useParams } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorBoundaryButton from '../components/ErrorBoundaryButton';
import Header from '../components/Header';
import Search from '../components/Search';

interface RootLayoutProps {
  searchValue: string;
  setSearchValue: (searchValue?: string) => void;
}

const RootLayout: FC<RootLayoutProps> = ({ searchValue, setSearchValue }) => {
  const { search, uid = '' } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setSearchValue(search);
  }, [search, setSearchValue]);

  const navigateTo = (search: string) => {
    const to = generatePath(':search/page/:number/:uid', {
      search,
      number: '1',
      uid,
    });
    navigate(to);
  };

  const handleSearch = (searchValue: string) => {
    navigateTo(searchValue);
  };

  return (
    <ErrorBoundary>
      <Header>
        <ErrorBoundaryButton />
        <Search value={search ?? searchValue} onSearch={handleSearch} />
      </Header>
      <Outlet />
    </ErrorBoundary>
  );
};

export default RootLayout;
