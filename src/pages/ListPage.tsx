import CardList from '@/components/CardList';
import { useAppParams } from '@/hooks';
import { ListPageContext } from '@/types';
import classNames from 'classnames';
import { FC } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';

const ListPage: FC = () => {
  const { details } = useAppParams();
  const { list } = useOutletContext<ListPageContext>();
  const navigate = useNavigate();

  const handleClose = () => {
    if (details) {
      navigate({ pathname: '..' }, { relative: 'path' });
    }
  };

  const handleOpen = (pathname: string) => {
    if (!details) {
      return () => {
        navigate({ pathname });
      };
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
        <CardList list={list} onCardClick={handleOpen} />
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
