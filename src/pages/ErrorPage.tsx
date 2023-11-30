import { Link, useRouteError } from 'react-router-dom';
import Alert from '../components/Alert';
import Button from '../components/Button';

const ErrorPage = () => {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <Alert severity="warning" message="Oops!" />
      <Alert
        severity="error"
        message="Sorry, an unexpected error has occurred."
      />
      <Alert severity="info" message={error && error.message} />
      <Link to="/">
        <Button icon="home">Home page</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
