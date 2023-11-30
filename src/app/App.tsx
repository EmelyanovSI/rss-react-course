import Progress from '@/components/common/Progress';
import ErrorBoundary from '@/components/ErrorBoundary';
import AppProvider from '@/context';
import router from '@/router';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <RouterProvider router={router} fallbackElement={<Progress />} />
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
