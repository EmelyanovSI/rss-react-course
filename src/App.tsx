import { ChangeEvent, Component } from 'react';
import Content from './components/Content';
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

  fetchData = (searchValue: string) => {
    this.setState({ status: Status.Loading });
    fetchPage(searchValue)
      .then(({ animals }) => {
        this.setState({ searchResults: animals });
        this.setState({ status: Status.Succeeded });
      })
      .catch((reason) => {
        this.setState({ message: reason });
        this.setState({ status: Status.Failed });
      });
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

  componentDidMount() {
    this.fetchData(this.state.searchValue);
  }

  render() {
    const { searchValue, searchResults, status, message } = this.state;

    return (
      <>
        <Header>
          <Search
            value={searchValue}
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
