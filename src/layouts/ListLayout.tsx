import { FC, useState } from 'react';
import {
  Outlet,
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import Pagination from '@/components/common/Pagination';
import Progress from '@/components/common/Progress';
import Nav from '@/components/Nav';
import { RouterParams } from '@/constants';
import { getOriginalPath } from '@/utils';

const ListLayout: FC = () => {
  const { page = '1', limit = '10', details = '' } = useParams<RouterParams>();
  const [searchParams] = useSearchParams();
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(true);
  const navigate = useNavigate();
  const { state } = useNavigation();

  const navigateTo = (newPage: string) => {
    const pathname = getOriginalPath(limit, details, newPage);
    navigate({ pathname, search: `${searchParams}` });
  };

  const handlePrevClick = () => {
    navigateTo(`${+page - 1}`);
  };

  const handleNextClick = () => {
    navigateTo(`${+page + 1}`);
  };

  if (state === 'loading') {
    return <Progress />;
  }

  return (
    <>
      <Nav>
        <Pagination
          {...{ first, last }}
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
        />
      </Nav>
      <Outlet context={{ setFirst, setLast }} />
    </>
  );
};

export default ListLayout;
