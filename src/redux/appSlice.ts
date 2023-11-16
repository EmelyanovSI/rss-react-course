import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  search: string;
  limit: string;
}

const initialState: AppState = {
  search: '',
  limit: '10',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    clearSearch: (state) => {
      state.search = '';
    },
    setLimit: (state, action: PayloadAction<string>) => {
      state.limit = action.payload;
    },
  },
});

export const { setSearch, clearSearch, setLimit } = appSlice.actions;

export default appSlice.reducer;
