import IconButton from '@/components/common/IconButton';
import { CardLayoutContext } from '@/types';
import { FC } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

const DetailsLayout: FC = () => {
  const { handleClose } = useOutletContext<CardLayoutContext>();

  return (
    <aside
      data-testid="details-layout"
      className="flex flex-col rounded-xl bg-gray-100 h-full p-4"
    >
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

export default DetailsLayout;
