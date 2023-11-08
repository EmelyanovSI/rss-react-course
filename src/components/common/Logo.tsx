import vite from '@/assets/vite.svg';
import { FC } from 'react';

const Logo: FC = () => {
  return (
    <div className="flex gap-2 items-center ">
      <img src={vite} alt="Vite" />
      <span>React Course · RS School</span>
    </div>
  );
};

export default Logo;
