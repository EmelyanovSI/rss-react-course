import { VITE_BASE_URL } from '@/constants';

export async function fetchPage(
  searchValue: string = '',
  pageNumber = 0,
  pageSize = 100
) {
  const apiUrl = `${VITE_BASE_URL}/animal/search?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  const requestBody = new URLSearchParams();
  requestBody.append('name', searchValue);

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: requestBody.toString(),
  };

  return fetch(apiUrl, requestOptions);
}

export async function fetchAnimal(uid: string) {
  const apiUrl = `${VITE_BASE_URL}/animal?uid=${uid}`;

  const requestOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  return fetch(apiUrl, requestOptions);
}
