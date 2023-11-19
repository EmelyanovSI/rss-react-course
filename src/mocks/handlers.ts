import { VITE_BASE_URL } from '@/constants';
import { AnimalPageResponse, Page } from '@/interfaces/animal';
import { http, HttpResponse } from 'msw';

const mockPage: Page = {
  firstPage: false,
  lastPage: false,
  pageNumber: 2,
  totalPages: 5,
  pageSize: 10,
  numberOfElements: 10,
  totalElements: 50,
};

const mockAnimal = {
  animal: {
    uid: '123',
    name: 'Name',
    earthAnimal: true,
    earthInsect: true,
    avian: true,
    canine: true,
    feline: true,
  },
};

const mockRes: AnimalPageResponse = {
  page: mockPage,
  animals: [mockAnimal.animal],
  sort: {
    clauses: [],
  },
};

export const handlers = [
  http.post(`${VITE_BASE_URL}/animal/search`, () => {
    return HttpResponse.json(mockRes);
  }),
  http.get(`${VITE_BASE_URL}/animal`, () => {
    return new HttpResponse(null, {
      status: 404,
      statusText: 'Mock error',
    });
  }),
];
