import AppProvider from '@/context';
import { FC, ReactElement } from 'react';

interface WrapperProps {
  children: ReactElement;
}

const Wrapper: FC<WrapperProps> = ({ children }) => (
  <AppProvider>{children}</AppProvider>
);

export default Wrapper;
