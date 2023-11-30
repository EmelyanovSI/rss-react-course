import { server } from '@/mocks';
import { api, store } from '@/redux';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(api.util.resetApiState());
});

afterAll(() => server.close());
