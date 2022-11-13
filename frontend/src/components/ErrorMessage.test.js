import { ErrorMessage } from './ErrorMessage';
import { render, screen } from '@testing-library/react';

describe('<ErrorMessage />', () => {
  it('should render server_error correctly', async () => {
    render(<ErrorMessage error="server_error" />);

    expect(
      await screen.findByText(/there was an error: unknown server error/i),
    ).toBeVisible();
  });

  it('should render invalid_request_body correctly', async () => {
    render(<ErrorMessage error="invalid_request_body" />);

    expect(
      await screen.findByText(/there was an error: invalid request body/i),
    ).toBeVisible();
  });

  it('should render invalid_email_address correctly', async () => {
    render(<ErrorMessage error="invalid_email_address" />);

    expect(
      await screen.findByText(
        /there was an error: correctness of these email addresses needs to be checked/i,
      ),
    ).toBeVisible();
  });

  it('should render send_failure correctly', async () => {
    render(<ErrorMessage error="send_failure" />);

    expect(
      await screen.findByText(
        /there was an error: failed to send emails to some addresses/i,
      ),
    ).toBeVisible();
  });

  it('should render error with emails correctly', async () => {
    const emails = ['john@example.com', 'smith@example.com'];
    render(<ErrorMessage error="send_failure" emails={emails} />);

    expect(
      await screen.findByText(
        /there was an error: failed to send emails to some addresses/i,
      ),
    ).toBeVisible();
    emails.forEach((email) => {
      expect(screen.getByText(email)).toBeVisible();
    });
  });
});
