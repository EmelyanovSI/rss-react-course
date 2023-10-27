import { ChangeEvent, Component } from 'react';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import { Animal } from './interfaces/Animal';
import { fetchPage } from './services/Animal';
import { getSearchValue, setSearchValue } from './utils';

interface AppState {
  searchValue: string;
  searchResults: Animal[];
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchValue: getSearchValue(),
      searchResults: [],
    };
  }

  componentDidMount() {
    const { searchValue } = this.state;
    fetchPage(searchValue).then(({ animals }) => {
      this.setState({ searchResults: animals });
    });
  }

  handleSearch = () => {
    const trimmedSearchValue = this.state.searchValue.trim();
    const previousSearchValue = getSearchValue();
    if (previousSearchValue === trimmedSearchValue) {
      return;
    }
    fetchPage(trimmedSearchValue).then(({ animals }) => {
      this.setState({ searchResults: animals });
      setSearchValue(trimmedSearchValue);
    });
  };

  handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value });
  };

  render() {
    const { searchValue, searchResults } = this.state;
    return (
      <div className="app">
        <div className="top-section">
          <Search
            value={searchValue}
            onSearch={this.handleSearch}
            onChange={this.handleSearchValueChange}
          />
        </div>
        <div className="bottom-section">
          <SearchResults searchResults={searchResults} />
        </div>
      </div>
    );
  }
}

export default App;
