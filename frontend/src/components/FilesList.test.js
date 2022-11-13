import { FilesList } from './FilesList';
import { render, screen } from '@testing-library/react';
import {
  uploadedFile1Mock,
  uploadedFile2Mock,
} from '../mocks/uploadedFilesMocks';

describe('<FilesList />', () => {
  it('should render correctly', async () => {
    render(<FilesList files={[uploadedFile1Mock, uploadedFile2Mock]} />);

    expect(await screen.findByText('emails-1.txt (2)')).toBeVisible();
    expect(await screen.findByText('emails-2.txt (1)')).toBeVisible();
  });
});
