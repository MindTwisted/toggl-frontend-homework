import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { file1Mock, file2Mock } from './mocks/fileMocks';
import { server } from './mocks/api/server';
import { postSendErrorHandler } from './mocks/api/handlers';

describe('<App />', () => {
  it('should render correctly', async () => {
    render(<App />);

    expect(await screen.findByTitle(/choose files/i)).toBeVisible();
  });

  it('should be able to upload files', async () => {
    render(<App />);

    const input = await screen.findByTitle(/choose files/i);

    await userEvent.upload(input, file1Mock);
    expect(await screen.findByText('emails-1.txt (2)')).toBeVisible();

    await userEvent.upload(input, file2Mock);
    expect(await screen.findByText('emails-1.txt (2)')).toBeVisible();
    expect(await screen.findByText('emails-2.txt (1)')).toBeVisible();
  });

  it('should show Send emails button after at least one file was uploaded', async () => {
    render(<App />);

    const input = await screen.findByTitle(/choose files/i);

    expect(
      screen.queryByRole('button', { name: /send emails/i }),
    ).not.toBeInTheDocument();

    await userEvent.upload(input, file1Mock);

    expect(
      await screen.findByRole('button', { name: /send emails/i }),
    ).toBeVisible();
  });

  it('should show loader while send emails request is pending', async () => {
    render(<App />);

    const input = await screen.findByTitle(/choose files/i);
    await userEvent.upload(input, file1Mock);

    const sendEmailsButton = await screen.findByRole('button', {
      name: /send emails/i,
    });
    await userEvent.click(sendEmailsButton);

    await waitFor(() => {
      screen.getByText(/loading/i);
    });
  });

  it('should show success message after emails were successfully sent', async () => {
    render(<App />);

    const input = await screen.findByTitle(/choose files/i);
    await userEvent.upload(input, file1Mock);

    const fileEntry = await screen.findByText('emails-1.txt (2)');
    const sendEmailsButton = await screen.findByRole('button', {
      name: /send emails/i,
    });

    expect(fileEntry).toBeVisible();
    expect(sendEmailsButton).toBeVisible();

    await userEvent.click(sendEmailsButton);

    expect(await screen.findByText(/emails sent successfully/i)).toBeVisible();

    expect(fileEntry).not.toBeVisible();
    expect(sendEmailsButton).not.toBeVisible();
  });

  it('should show error message when was not able to send emails successfully', async () => {
    server.use(postSendErrorHandler);
    render(<App />);

    const input = await screen.findByTitle(/choose files/i);
    await userEvent.upload(input, file1Mock);

    const fileEntry = await screen.findByText('emails-1.txt (2)');
    const sendEmailsButton = await screen.findByRole('button', {
      name: /send emails/i,
    });

    expect(fileEntry).toBeVisible();
    expect(sendEmailsButton).toBeVisible();

    await userEvent.click(sendEmailsButton);

    expect(await screen.findByText(/there was an error/i)).toBeVisible();

    expect(fileEntry).toBeVisible();
    expect(sendEmailsButton).toBeVisible();
  });
});
