import { triggerError } from '@/utils';
import { FC, useEffect, useState } from 'react';
import Button from './common/Button';

const ErrorBoundaryButton: FC = () => {
  const [hasError, setHasError] = useState(false);

  const handleThrowError = () => {
    setHasError(true);
  };

  useEffect(() => {
    if (hasError) {
      triggerError();
    }
  }, [hasError]);

  return (
    <Button icon="report" onClick={handleThrowError}>
      Throw an Error
    </Button>
  );
};

export default ErrorBoundaryButton;
