import classNames from 'classnames';
import { ChangeEvent, Component } from 'react';
import './Search.css';

interface SearchProps {
  value: string;
  onBack: () => void;
  onSearch: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface SearchState {
  open: boolean;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleFocus = () => {
    this.setState({ open: true });
  };

  handleBack = () => {
    this.props.onBack();
    this.setState({ open: false });
  };

  handleSearch = () => {
    this.props.onSearch();
    this.setState({ open: false });
  };

  render() {
    const searchBar = classNames('search-bar', {
      'focus-within': this.state.open,
    });
    const backButton = classNames('back-button', {
      visible: this.state.open,
    });

    return (
      <div className={searchBar}>
        <button type="button" className={backButton} onClick={this.handleBack}>
          <span className="material-icons">arrow_back</span>
        </button>
        <input
          className="search-input"
          name="search"
          type="search"
          placeholder="Search..."
          value={this.props.value}
          onChange={this.props.onChange}
          onFocus={this.handleFocus}
        />
        <button
          type="button"
          className="search-button"
          onClick={this.handleSearch}
        >
          <span className="material-icons">search</span>
        </button>
      </div>
    );
  }
}

export default Search;
