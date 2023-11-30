import { render, screen, userEvent } from '@/utils/test-utils';
import { MemoryRouter } from 'react-router-dom';
import CardLayout from './CardLayout';

const handleCloseMock = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useOutletContext: vi.fn(() => ({ handleClose: handleCloseMock })),
  };
});

describe('CardLayout Component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <CardLayout />
      </MemoryRouter>
    );

    expect(screen.getByTestId('card-layout')).toBeDefined();
  });

  it('handles close button click', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CardLayout />
      </MemoryRouter>
    );

    const closeButton = screen.getByTitle('Close');
    await user.click(closeButton);

    expect(handleCloseMock).toHaveBeenCalled();
  });
});
