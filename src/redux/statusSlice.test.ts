import { Status } from '@/constants';
import { api, selectStatus, store } from '@/redux';

describe('status reducer', () => {
  it(
    'should handle pending, fulfilled, and rejected actions',
    async () => {
      await store.dispatch(
        api.endpoints.getPage.initiate({
          page: '1',
          limit: '10',
          search: '',
        })
      );
      await store.dispatch(api.endpoints.getAnimal.initiate('uid'));

      const currentState = store.getState();
      expect(currentState.status.getPage).toBe(Status.Fulfilled);
      expect(currentState.status.getAnimal).toBe(Status.Rejected);
    },
    { timeout: 10000 }
  );
});

describe('selectStatus selector', () => {
  it('should correctly select status for getPage endpoint', () => {
    const state = {
      status: {
        getPage: Status.Pending,
        getAnimal: Status.Fulfilled,
      },
    };

    const result = selectStatus('getPage')(state);
    expect(result.isUninitialized).toBe(false);
    expect(result.isLoading).toBe(true);
    expect(result.isSuccess).toBe(false);
    expect(result.isError).toBe(false);
  });

  it('should correctly select status for getAnimal endpoint', () => {
    const state = {
      status: {
        getPage: Status.Fulfilled,
        getAnimal: Status.Rejected,
      },
    };

    const result = selectStatus('getAnimal')(state);
    expect(result.isUninitialized).toBe(false);
    expect(result.isLoading).toBe(false);
    expect(result.isSuccess).toBe(false);
    expect(result.isError).toBe(true);
  });
});
