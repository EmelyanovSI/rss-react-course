import { ChangeEvent, Component } from 'react';

interface SearchProps {
  value: string;
  onSearch: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

class Search extends Component<SearchProps> {
  render() {
    return (
      <div>
        <input
          type="search"
          value={this.props.value}
          onChange={this.props.onChange}
          placeholder="Search..."
        />
        <button onClick={this.props.onSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
