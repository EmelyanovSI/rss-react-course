import CardList from '@/components/CardList';
import { ListContext, RouterParams } from '@/constants';
import { AnimalPageResponse } from '@/interfaces/animal';
import classNames from 'classnames';
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
    if (details) {
      navigate(
        {
          pathname: '..',
          search: `${searchParams}`,
        },
        { relative: 'path' }
      );
    }
  };

  useEffect(() => {
    setPagination(page);
  }, [page, setPagination]);

  return (
    <div className={classNames({ flex: details })}>
      <div
        className={classNames(
          'transition-all duration-500 ease-in-out',
          { 'w-full': !details },
          { 'cursor-pointer w-2/3': details }
        )}
        onClick={handleClose}
      >
        <CardList list={animals} />
      </div>
      <div
        className={classNames(
          'transition-all duration-500 ease-in-out',
          { 'w-0': !details },
          { 'min-w-fit w-1/3 p-6': details }
        )}
      >
        <Outlet context={{ handleClose }} />
      </div>
    </div>
  );
};

export default ListPage;
