import Pagination from '@/components/common/Pagination';
import Progress from '@/components/common/Progress';
import Nav from '@/components/Nav';
import { RouterParams } from '@/constants';
import { Page } from '@/interfaces/animal';
import { getOriginalPath } from '@/utils';
import { FC, useState } from 'react';
import {
  Outlet,
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
} from 'react-router-dom';

const ListLayout: FC = () => {
  const { page = '1', limit = '10', details = '' } = useParams<RouterParams>();
  const [searchParams] = useSearchParams();
  const [pagination, setPagination] = useState<Page>();
  const navigate = useNavigate();
  const { state } = useNavigation();

  const navigateTo = (newPage: string = page, newLimit: string = limit) => {
    const pathname = getOriginalPath(newLimit, details, newPage);
    navigate({ pathname, search: `${searchParams}` });
  };

  const handlePrevClick = () => {
    navigateTo(`${+page - 1}`);
  };

  const handleNextClick = () => {
    navigateTo(`${+page + 1}`);
  };

  const handlePageChange = (page: number) => {
    navigateTo(`${page}`);
  };

  const handlePageSizeChange = (newLimit: number) => {
    navigateTo('1', `${newLimit}`);
  };

  if (state === 'loading') {
    return <Progress />;
  }

  return (
    <>
      <Nav>
        {pagination && (
          <Pagination
            page={pagination}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </Nav>
      <Outlet context={{ setPagination }} />
    </>
  );
};

export default ListLayout;
