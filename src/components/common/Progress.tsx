import { FC } from 'react';

const Progress: FC = () => {
  return (
    <div role="progressbar" className="h-1 bg-red-100">
      <div className="h-full bg-red-300 animate-progress" />
    </div>
  );
};

export default Progress;
