import { ViewMode } from '@/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  search: string;
  limit: string;
  mode: ViewMode;
}

export const initialState: AppState = {
  search: '',
  limit: '10',
  mode: ViewMode.Detailed,
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
    toggleMode: (state) => {
      state.mode =
        state.mode === ViewMode.Detailed ? ViewMode.Compact : ViewMode.Detailed;
    },
  },
});

export const { setSearch, clearSearch, setLimit, toggleMode } =
  appSlice.actions;

export default appSlice.reducer;
