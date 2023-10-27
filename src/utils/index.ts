export function getSearchValue() {
  return localStorage.getItem('searchValue') ?? '';
}

export function setSearchValue(searchValue: string) {
  localStorage.setItem('searchValue', searchValue);
}
