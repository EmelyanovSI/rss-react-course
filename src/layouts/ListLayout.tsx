import { FC, useState } from 'react';
import {
  generatePath,
  Outlet,
  useNavigate,
  useNavigation,
  useParams,
} from 'react-router-dom';
import Pagination from '@/components/common/Pagination';
import Progress from '@/components/common/Progress';
import Nav from '@/components/Nav';

const ListLayout: FC = () => {
  const { number = 1, uid = '' } = useParams();
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(true);
  const navigate = useNavigate();
  const { state } = useNavigation();

  const navigateTo = (number: string) => {
    const to = generatePath(':number/:uid', {
      number,
      uid,
    });
    navigate(to);
  };

  const handlePrevClick = () => {
    navigateTo(`${+number - 1}`);
  };

  const handleNextClick = () => {
    navigateTo(`${+number + 1}`);
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
