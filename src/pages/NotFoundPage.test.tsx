import { render, screen } from '@/utils/test-utils';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage Component', () => {
  it('renders the not found page with proper content', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found!')).toBeInTheDocument();
    expect(screen.getByText('Home page')).toBeInTheDocument();
  });
});
