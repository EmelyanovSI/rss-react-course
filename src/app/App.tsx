import Progress from '@/components/common/Progress.tsx';
import { store } from '@/redux';
import router from '@/router';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <RouterProvider router={router} fallbackElement={<Progress />} />
    </ReduxProvider>
  );
};

export default App;
