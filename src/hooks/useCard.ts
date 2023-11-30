import { Status } from '@/constants';
import { Animal } from '@/interfaces/animal';
import { fetchAnimal } from '@/services/animal';
import { RouterParams } from '@/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useCard = () => {
  const { details } = useParams<RouterParams>();
  const [animal, setAnimal] = useState<Animal>({} as Animal);
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setStatus(Status.Loading);
    setAnimal({} as Animal);
    setMessage('');
    fetchAnimal(details)
      .then((value) => {
        setStatus(Status.Succeeded);
        setAnimal(value.animal);
      })
      .catch((reason) => {
        setStatus(Status.Failed);
        setMessage(reason.message);
      });
  }, [details]);

  return { animal, status, message };
};
