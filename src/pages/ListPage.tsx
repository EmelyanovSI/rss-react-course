import CardList from '@/components/CardList';
import { ListContext, RouterParams } from '@/constants';
import { AnimalPageResponse } from '@/interfaces/animal';
import { FC, useEffect } from 'react';
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';

const ListPage: FC = () => {
  const { details } = useParams<RouterParams>();
  const [searchParams] = useSearchParams();
  const { setPagination } = useOutletContext<ListContext>();
  const { page, animals } = useLoaderData() as AnimalPageResponse;
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(
      {
        pathname: '..',
        search: `${searchParams}`,
      },
      { relative: 'path' }
    );
  };

  useEffect(() => {
    setPagination(page);
  }, [page, setPagination]);

  if (details) {
    return (
      <div className="flex">
        <div className="cursor-pointer w-1/2" onClick={handleClose}>
          <CardList list={animals} />
        </div>
        <div className="w-1/2 p-6">
          <Outlet context={{ handleClose }} />
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
