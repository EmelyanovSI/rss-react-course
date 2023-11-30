import IconButton from '@/components/common/IconButton';
import { useCard } from '@/hooks';
import { CardLayoutContext } from '@/types';
import { FC } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

const CardLayout: FC = () => {
  const { handleClose } = useOutletContext<CardLayoutContext>();
  const { animal, status, message } = useCard();

  return (
    <aside
      data-testid="card-layout"
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
      <Outlet context={{ animal, status, message }} />
    </aside>
  );
};

export default CardLayout;
