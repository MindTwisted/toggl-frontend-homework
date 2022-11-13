import { FilesListItem } from './FilesListItem';
import { render, screen } from '@testing-library/react';
import { uploadedFile1Mock } from '../mocks/uploadedFilesMocks';

describe('<FilesListItem />', () => {
  it('should render correctly', async () => {
    render(<FilesListItem file={uploadedFile1Mock} />);

    expect(await screen.findByText('emails-1.txt (2)')).toBeVisible();
  });
});
