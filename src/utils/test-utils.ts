import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import Wrapper from './Wrapper';

function customRender(ui: ReactElement, options = {}) {
  return render(ui, {
    wrapper: Wrapper,
    ...options,
  });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
