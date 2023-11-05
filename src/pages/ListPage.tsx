import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import CardList from '../components/CardList';
import { AnimalPageResponse } from '../interfaces/Animal';

const ListPage: FC = () => {
  const { uid } = useParams();
  const { setFirst, setLast } = useOutletContext<{
    setFirst: Dispatch<SetStateAction<boolean>>;
    setLast: Dispatch<SetStateAction<boolean>>;
  }>();
  const {
    page: { firstPage, lastPage },
    animals,
  } = useLoaderData() as AnimalPageResponse;
  const navigate = useNavigate();

  useEffect(() => {
    setFirst(firstPage);
    setLast(lastPage);
  }, [firstPage, lastPage, setFirst, setLast]);

  if (uid) {
    return (
      <div className="flex">
        <div
          className="cursor-pointer w-1/2"
          onClick={() => navigate('..', { relative: 'path' })}
        >
          <CardList list={animals} />
        </div>
        <div className="w-1/2 p-6">
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <CardList list={animals} />
    </div>
  );
};

export default ListPage;
