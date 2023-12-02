import vite from '@/assets/vite.svg';
import classNames from 'classnames';
import { FC } from 'react';

interface LogoProps {
  onClick?: () => void;
}

const Logo: FC<LogoProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={classNames('flex gap-2 items-center', {
        'cursor-pointer select-none active:underline': onClick,
      })}
    >
      <img src={vite} alt="Vite" />
      <span>React Course · RS School</span>
    </div>
  );
};

export default Logo;
