import classNames from 'classnames';
import { ChangeEvent, FC, FormEvent, useRef, useState } from 'react';
import IconButton from './IconButton';

interface SearchProps {
  value: string;
  onSearch: (searchValue: string) => void;
}

const Search: FC<SearchProps> = ({ value, onSearch }) => {
  const [searchValue, setSearchValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setSearchValue('');
    inputRef.current?.focus();
  };

  const handleSearch = () => {
    const trimmedSearchValue = searchValue.trim();
    if (value !== trimmedSearchValue) {
      onSearch(trimmedSearchValue);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <form
      action="#"
      role="form"
      onSubmit={handleFormSubmit}
      className={classNames(
        'flex items-center gap-1 rounded-full border',
        'focus-within:shadow focus-within:w-96 focus-within:bg-transparent',
        'transition-all duration-500 hover:shadow',
        'bg-gray-100 pl-4 w-72'
      )}
    >
      <input
        autoFocus
        accessKey="f"
        aria-label="Search value"
        className="flex-1 outline-none bg-transparent h-10 select-none"
        name="search"
        type="search"
        placeholder="Search..."
        ref={inputRef}
        value={searchValue}
        onChange={handleChange}
      />
      {searchValue && (
        <IconButton name="close" title="Clear" onClick={handleClear} />
      )}
      <IconButton
        name="search"
        title="Search"
        disabled={value === searchValue.trim()}
        onClick={handleSearch}
      />
    </form>
  );
};

export default Search;
