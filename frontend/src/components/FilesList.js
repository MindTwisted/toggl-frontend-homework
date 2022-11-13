import { FilesListItem } from './FilesListItem';

export const FilesList = ({ files }) => (
  <ul>
    {files.map((file) => (
      <FilesListItem key={file.name} file={file} />
    ))}
  </ul>
);
