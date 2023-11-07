import { FC, ReactNode, useReducer } from 'react';
import { defaultValue } from './actions';
import { AppContext, AppDispatchContext } from './context';
import { reducer } from './reducer';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [value, dispatch] = useReducer(reducer, defaultValue);

  return (
    <AppContext.Provider value={value}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export default AppProvider;
