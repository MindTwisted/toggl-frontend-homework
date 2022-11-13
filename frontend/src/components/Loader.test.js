import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('<Loader />', () => {
  it('should render correctly', async () => {
    render(<Loader />);

    expect(await screen.findByText(/loading/i)).toBeVisible();
  });
});
