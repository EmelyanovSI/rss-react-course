import IconButton from '@/components/common/IconButton';
import { CardLayoutContext, RouterParams, Status } from '@/constants';
import { Animal } from '@/interfaces/animal';
import { fetchAnimal } from '@/services/animal';
import { FC, useEffect, useState } from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';

const CardLayout: FC = () => {
  const { handleClose } = useOutletContext<CardLayoutContext>();
  const { details } = useParams<RouterParams>();
  const [animal, setAnimal] = useState<Animal>({} as Animal);
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setStatus(Status.Loading);
    fetchAnimal(details)
      .then((value) => {
        setStatus(Status.Succeeded);
        setAnimal(value.animal);
      })
      .catch((reason) => {
        setStatus(Status.Failed);
        setMessage(reason);
      });
  }, [details]);

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
      <Outlet context={{ animal, status, message }} />
    </aside>
  );
};

export default CardLayout;
