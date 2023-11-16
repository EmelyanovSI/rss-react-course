import { persistor, store } from '@/redux';
import { FC, ReactElement } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate as PersistProvider } from 'redux-persist/integration/react';

interface WrapperProps {
  children: ReactElement;
}

const Wrapper: FC<WrapperProps> = ({ children }) => (
  <ReduxProvider store={store}>
    <PersistProvider persistor={persistor}>{children}</PersistProvider>
  </ReduxProvider>
);

export default Wrapper;
