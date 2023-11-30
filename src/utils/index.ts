export function getSearchValue() {
  return localStorage.getItem('searchValue') ?? '';
}

export function setSearchValue(searchValue?: string) {
  if (searchValue) {
    localStorage.setItem('searchValue', searchValue);
  } else {
    localStorage.removeItem('searchValue');
  }
}
