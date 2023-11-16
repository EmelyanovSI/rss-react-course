import { DEV } from '@/constants';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { api } from './api';
import appSlice, { AppState } from './appSlice';

interface Reducer<T> {
  app: AppState & T;
  [api.reducerPath]: ReturnType<typeof api.reducer>;
}

const [appPersistor] = [{ key: appSlice.name, storage, blacklist: [] }];

const store = configureStore({
  reducer: combineReducers<Reducer<PersistPartial>>({
    app: persistReducer<AppState>(appPersistor, appSlice),
    [api.reducerPath]: api.reducer,
  }),
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware);
  },
  devTools: DEV,
  preloadedState: {},
  enhancers: [],
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, persistor };
