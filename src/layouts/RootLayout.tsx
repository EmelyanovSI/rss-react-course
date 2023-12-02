import Logo from '@/components/common/Logo.tsx';
import Header from '@/components/Header.tsx';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout: FC = () => {
  return (
    <div>
      <Header>
        <div className="flex gap-6">
          <Logo />
        </div>
      </Header>
      <Outlet />
    </div>
  );
};

export default RootLayout;
