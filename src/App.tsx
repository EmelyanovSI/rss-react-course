import { FC, useEffect, useState } from 'react';
import Content from './components/Content';
import ErrorButton from './components/ErrorButton';
import Header from './components/Header';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import { Status } from './constants/enums';
import { Animal } from './interfaces/Animal';
import { fetchPage } from './services/Animal';
import { getSearchValue, setSearchValue } from './utils';

const App: FC = () => {
  const [value, setValue] = useState<string>(getSearchValue());
  const [results, setResults] = useState<Animal[]>([]);
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetchData(value);
  }, [value]);

  useEffect(() => {
    return () => {
      setSearchValue(value);
    };
  });

  const fetchData = (searchValue: string) => {
    setStatus(Status.Loading);
    fetchPage(searchValue)
      .then(({ animals }) => {
        setResults(animals);
        setStatus(Status.Succeeded);
      })
      .catch((reason: string) => {
        setMessage(reason);
        setStatus(Status.Failed);
      });
  };

  const handleSearch = (searchValue: string) => {
    setValue(searchValue);
  };

  return (
    <>
      <Header>
        <ErrorButton />
        <Search value={value} onSearch={handleSearch} />
      </Header>
      <Content {...{ status, message }}>
        <SearchResults results={results} />
      </Content>
    </>
  );
};

export default App;
