export const FilesListItem = ({ file }) => (
  <li>
    {file.name} ({file.content.length})
  </li>
);
