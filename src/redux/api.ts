import { VITE_BASE_URL } from '@/constants';
import {
  AnimalPageRequest,
  AnimalPageResponse,
  AnimalRequest,
  AnimalResponse,
} from '@/interfaces/animal';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: VITE_BASE_URL,
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    getPage: builder.query<AnimalPageResponse, AnimalPageRequest>({
      query: ({ search, page, limit }) => {
        const requestBody = new URLSearchParams();
        requestBody.append('name', search);

        return {
          url: `animal/search?pageNumber=${+page - 1}&pageSize=${limit}`,
          method: 'POST',
          body: requestBody.toString(),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
      },
    }),
    getAnimal: builder.query<AnimalResponse, AnimalRequest>({
      query: (uid) => `animal?uid=${uid}`,
    }),
  }),
});

export const { useGetPageQuery, useGetAnimalQuery } = api;
