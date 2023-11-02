import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import Alert from '../components/Alert';
import Button from '../components/Button';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col items-center gap-6 p-6">
        <Alert severity="warning" message="Oops!" />
        <Alert
          severity="error"
          message="Sorry, an unexpected error has occurred."
        />
        <Alert
          severity="info"
          message={error.statusText || error.data.message}
        />
        <Link to="/">
          <Button icon="home">Home page</Button>
        </Link>
      </div>
    );
  }

  return null;
};

export default ErrorPage;
