import { ChangeEvent, Component } from 'react';
import './Search.css';

interface SearchProps {
  value: string;
  onSearch: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

class Search extends Component<SearchProps> {
  render() {
    return (
      <div className="search-bar">
        <input
          className="search-input"
          name="search"
          type="search"
          placeholder="Search..."
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <button className="search-button" onClick={this.props.onSearch}>
          <i className="material-icons">search</i>
        </button>
      </div>
    );
  }
}

export default Search;
