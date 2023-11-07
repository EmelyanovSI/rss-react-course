import IconButton from '@/components/common/IconButton';
import { CardContext } from '@/constants';
import { FC } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

const CardLayout: FC = () => {
  const { handleClose } = useOutletContext<CardContext>();

  return (
    <aside className="flex flex-col rounded-xl bg-gray-100 h-full p-4">
      <div className="flex justify-between">
        <h3 className="text-2xl">Card details</h3>
        <IconButton
          className="hover:bg-red-100"
          name="close"
          title="Close"
          onClick={handleClose}
        />
      </div>
      <Outlet />
    </aside>
  );
};

export default CardLayout;
