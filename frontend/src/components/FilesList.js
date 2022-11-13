import { FilesListItem } from './FilesListItem';

export const FilesList = ({ files }) => (
  <ul>
    {files.map((file, index) => (
      <FilesListItem key={`${file.name}_${index}`} file={file} />
    ))}
  </ul>
);
