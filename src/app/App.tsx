import Progress from '@/components/common/Progress';
import ErrorBoundary from '@/components/ErrorBoundary';
import { persistor, store } from '@/redux';
import router from '@/router';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate as PersistProvider } from 'redux-persist/integration/react';

const App = () => {
  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <PersistProvider persistor={persistor} loading={<Progress />}>
          <RouterProvider router={router} fallbackElement={<Progress />} />
        </PersistProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
};

export default App;
