import { FC, useState } from 'react';
import {
  Outlet,
  useNavigate,
  useNavigation,
  useParams,
} from 'react-router-dom';
import Nav from '../components/Nav';
import Pagination from '../components/Pagination';
import Progress from '../components/Progress';

const ListLayout: FC = () => {
  const { number } = useParams();
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(true);
  const navigate = useNavigate();
  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return <Progress />;
  }

  return (
    <>
      <Nav>
        <Pagination
          first={first}
          last={last}
          onPrevClick={() => navigate(`${+number! - 1}`)}
          onNextClick={() => navigate(`${+number! + 1}`)}
        />
      </Nav>
      <Outlet context={{ setFirst, setLast }} />
    </>
  );
};

export default ListLayout;
