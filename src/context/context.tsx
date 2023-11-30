import { createContext, Dispatch } from 'react';
import { AppContextAction, AppContextValue, defaultValue } from './actions';

export const AppContext = createContext<AppContextValue>(defaultValue);
export const AppDispatchContext = createContext<Dispatch<AppContextAction>>(
  {} as Dispatch<AppContextAction>
);
