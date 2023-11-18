import { render, screen, userEvent } from '@/utils/test-utils';
import { MemoryRouter } from 'react-router-dom';
import DetailsLayout from './DetailsLayout';

const handleCloseMock = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useOutletContext: vi.fn(() => ({ handleClose: handleCloseMock })),
  };
});

describe('DetailsLayout Component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <DetailsLayout />
      </MemoryRouter>
    );

    expect(screen.getByTestId('details-layout')).toBeDefined();
  });

  it('handles close button click', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DetailsLayout />
      </MemoryRouter>
    );

    const closeButton = screen.getByTitle('Close');
    await user.click(closeButton);

    expect(handleCloseMock).toHaveBeenCalled();
  });
});
