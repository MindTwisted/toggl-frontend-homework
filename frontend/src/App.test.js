import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { file1Mock, file2Mock } from './mocks/fileMocks';

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
});
