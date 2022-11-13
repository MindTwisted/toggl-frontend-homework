import { UploadFiles } from './UploadFiles';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { file1Mock, file2Mock } from '../mocks/fileMocks';

const mockOnFilesUploaded = jest.fn();

describe('<UploadFiles />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', async () => {
    render(<UploadFiles />);

    expect(await screen.findByTitle(/choose files/i)).toBeVisible();
  });

  it('should be able to upload one file', async () => {
    render(<UploadFiles onFilesUploaded={mockOnFilesUploaded} />);

    const input = await screen.findByTitle(/choose files/i);

    await userEvent.upload(input, file1Mock);

    expect(mockOnFilesUploaded).toHaveBeenCalledTimes(1);
    expect(mockOnFilesUploaded).toHaveBeenCalledWith([
      {
        name: 'emails-1.txt',
        content: ['john@example.com', 'smith@example.com'],
      },
    ]);
  });

  it('should be able to upload multiple files', async () => {
    render(<UploadFiles onFilesUploaded={mockOnFilesUploaded} />);

    const input = await screen.findByTitle(/choose files/i);

    await userEvent.upload(input, [file1Mock, file2Mock]);

    expect(mockOnFilesUploaded).toHaveBeenCalledTimes(1);
    expect(mockOnFilesUploaded).toHaveBeenCalledWith([
      {
        name: 'emails-1.txt',
        content: ['john@example.com', 'smith@example.com'],
      },
      {
        name: 'emails-2.txt',
        content: ['michael@example.com'],
      },
    ]);
  });
});
