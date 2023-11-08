import CardList from '@/components/CardList';
import { useAppContext } from '@/context/hooks';
import { RouterParams } from '@/types';
import classNames from 'classnames';
import { FC } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const ListPage: FC = () => {
  const { details } = useParams<RouterParams>();
  const navigate = useNavigate();
  const { list } = useAppContext();

  const handleClose = () => {
    if (details) {
      navigate({ pathname: '..' }, { relative: 'path' });
    }
  };

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
        <CardList list={list} />
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
