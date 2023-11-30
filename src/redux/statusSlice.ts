import { Status } from '@/constants';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { api } from './api';

type Keys = keyof typeof api.endpoints;

export type StatusState = {
  [key in Keys]: Status;
};

const initialState: StatusState = {
  getPage: Status.Idle,
  getAnimal: Status.Idle,
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    for (const endpoint of Object.values(api.endpoints)) {
      builder
        .addMatcher(endpoint.matchPending, (state) => {
          state[endpoint.name as Keys] = Status.Pending;
        })
        .addMatcher(endpoint.matchFulfilled, (state) => {
          state[endpoint.name as Keys] = Status.Fulfilled;
        })
        .addMatcher(endpoint.matchRejected, (state) => {
          state[endpoint.name as Keys] = Status.Rejected;
        });
    }
  },
});

export const selectStatus = (endpointName: string) =>
  createSelector([(state) => state.status], (statusState) => {
    const endpointStatusState = statusState[endpointName];
    return {
      isUninitialized: endpointStatusState === Status.Idle,
      isLoading: endpointStatusState === Status.Pending,
      isSuccess: endpointStatusState === Status.Fulfilled,
      isError: endpointStatusState === Status.Rejected,
    };
  });

export default statusSlice.reducer;
