import Progress from '@/components/common/Progress';
import ErrorBoundary from '@/components/ErrorBoundary';
import router from '@/router';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} fallbackElement={<Progress />} />
    </ErrorBoundary>
  );
};

export default App;
