import { useContext } from 'react';
import { AppContext, AppDispatchContext } from './context';

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used inside the AppProvider');
  }

  return context;
};

export const useAppReducer = () => {
  const context = useContext(AppDispatchContext);

  if (!context) {
    throw new Error('useAppReducer must be used inside the AppProvider');
  }

  return context;
};
