import { VITE_BASE_URL } from '@/constants';
import { AnimalPageResponse, AnimalResponse } from '@/interfaces/animal';

export async function fetchPage(
  searchValue: string = '',
  pageNumber: string | number = 0,
  pageSize: string | number = 100
): Promise<AnimalPageResponse> {
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

  const response = await fetch(apiUrl, requestOptions);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to fetch data');
  }
}

export async function fetchAnimal(uid: string = ''): Promise<AnimalResponse> {
  const apiUrl = `${VITE_BASE_URL}/animal?uid=${uid}`;

  const requestOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const response = await fetch(apiUrl, requestOptions);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to fetch data');
  }
}
