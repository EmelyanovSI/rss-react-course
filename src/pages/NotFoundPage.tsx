import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div
      data-testid="not-found-page"
      className="flex flex-col items-center gap-6 p-6"
    >
      <Alert severity="warning" message="Oops!" />
      <Alert severity="info" message="404" />
      <Alert severity="error" message="Page not found!" />
      <Link to="/">
        <Button icon="home">Home page</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
