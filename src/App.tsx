import { ChangeEvent, Component } from 'react';
import Content from './components/Content';
import ErrorButton from './components/ErrorButton';
import Header from './components/Header';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import { Status } from './constants/enums';
import { Animal } from './interfaces/Animal';
import { Loading } from './interfaces/Loading';
import { fetchPage } from './services/Animal';
import { getSearchValue, setSearchValue } from './utils';

interface AppState extends Loading {
  searchValue: string;
  searchResults: Animal[];
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchValue: getSearchValue(),
      searchResults: [],
      status: Status.Idle,
      message: '',
    };
  }

  componentDidMount() {
    this.fetchData(this.state.searchValue);
  }

  fetchData = (searchValue: string) => {
    this.setState({ status: Status.Loading });
    fetchPage(searchValue)
      .then(({ animals }) => {
        this.setState({
          searchResults: animals,
          status: Status.Succeeded,
        });
      })
      .catch((reason: string) => {
        this.setState({
          message: reason,
          status: Status.Failed,
        });
      });
  };

  handleBack = () => {
    this.setState({ searchValue: getSearchValue() });
  };

  handleSearch = () => {
    const trimmedSearchValue = this.state.searchValue.trim();
    const previousSearchValue = getSearchValue();
    if (previousSearchValue !== trimmedSearchValue) {
      setSearchValue(trimmedSearchValue);
      this.fetchData(trimmedSearchValue);
    }
  };

  handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value });
  };

  render() {
    const { searchValue, searchResults, status, message } = this.state;

    return (
      <>
        <Header>
          <ErrorButton />
          <Search
            value={searchValue}
            onBack={this.handleBack}
            onSearch={this.handleSearch}
            onChange={this.handleSearchValueChange}
          />
        </Header>
        <Content {...{ status, message }}>
          <SearchResults searchResults={searchResults} />
        </Content>
      </>
    );
  }
}

export default App;
