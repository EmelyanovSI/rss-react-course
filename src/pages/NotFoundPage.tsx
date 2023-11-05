import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import Button from '../components/Button';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <Alert severity="warning" message="Oops!" />
      <Alert severity="info" message="404" />
      <Alert severity="error" message="Page not found!" />
      <Link to="/">
        <Button icon="home">Home page</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
