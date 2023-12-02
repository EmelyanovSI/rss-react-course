import { createSlice } from '@reduxjs/toolkit';

export interface AppState {}

export const initialState: AppState = {};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {},
});

// export const {} = formSlice.actions;

export default formSlice.reducer;
