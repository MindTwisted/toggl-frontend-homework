import { render, screen } from '@testing-library/react';
import { SuccessMessage } from './SuccessMessage';

describe('<SuccessMessage />', () => {
  it('should render correctly', async () => {
    render(<SuccessMessage />);

    expect(await screen.findByText(/emails sent successfully/i)).toBeVisible();
  });
});
