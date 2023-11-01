import classNames from 'classnames';
import { ChangeEvent, Component, createRef } from 'react';
import IconButton from '../IconButton';

interface SearchProps {
  value: string;
  onSearch: (searchValue: string) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface SearchState {
  value: string;
}

class Search extends Component<SearchProps, SearchState> {
  inputRef = createRef<HTMLInputElement>();

  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  handleClear = () => {
    this.setState({ value: '' });
    this.inputRef.current?.focus();
  };

  handleSearch = () => {
    const trimmedSearchValue = this.state.value.trim();
    if (this.props.value !== trimmedSearchValue) {
      this.props.onSearch(trimmedSearchValue);
    }
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { value } = this.state;

    return (
      <div
        className={classNames(
          'flex items-center gap-1 rounded-full border',
          'focus-within:shadow focus-within:w-96 focus-within:bg-transparent',
          'transition-all duration-500 hover:shadow',
          'bg-gray-100 pl-3 w-72'
        )}
      >
        <input
          autoFocus
          aria-label="Search value"
          className="flex-1 outline-none bg-transparent h-10"
          name="search"
          type="search"
          placeholder="Search..."
          ref={this.inputRef}
          value={value}
          onChange={this.handleChange}
        />
        {value && (
          <IconButton name="close" title="Clear" onClick={this.handleClear} />
        )}
        <IconButton
          name="search"
          title="Search"
          disabled={this.props.value === value.trim()}
          onClick={this.handleSearch}
        />
      </div>
    );
  }
}

export default Search;
