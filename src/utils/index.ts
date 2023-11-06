import { generatePath } from 'react-router-dom';

export function getSearchFromStorage() {
  return localStorage.getItem('search') ?? '';
}

export function setSearchFromStorage(search?: string) {
  if (search) {
    localStorage.setItem('search', search);
  } else {
    localStorage.removeItem('search');
  }
}

export function getOriginalPath(limit = '10', details = '', page = '1') {
  const originalPath = '/page/:page/limit/:limit/:details';
  return generatePath(originalPath, {
    page,
    limit,
    details,
  });
}
