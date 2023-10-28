import { VITE_BASE_URL } from '../constants';
import { AnimalResponse } from '../interfaces/Animal';

export async function fetchPage(
  searchValue: string,
  pageNumber = 0,
  pageSize = 100
): Promise<AnimalResponse> {
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

  try {
    const response = await fetch(apiUrl, requestOptions);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error:', error);
    return {} as AnimalResponse;
  }
}
