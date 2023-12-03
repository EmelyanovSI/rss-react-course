import Logo from '@/components/common/Logo.tsx';
import Header from '@/components/Header.tsx';
import Nav from '@/components/Nav.tsx';
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
      <Nav />
      <Outlet />
    </div>
  );
};

export default RootLayout;
