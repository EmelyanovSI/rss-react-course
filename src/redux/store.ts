import { DEV } from '@/constants';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import formSlice from './formSlice.ts';

const store = configureStore({
  reducer: {
    form: formSlice,
  },
  devTools: DEV,
  preloadedState: {},
  enhancers: [],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store };
