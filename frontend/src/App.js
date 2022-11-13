import { useState } from 'react';
import { UploadFiles } from './components/UploadFiles';
import { FilesList } from './components/FilesList';

const App = () => {
  const [files, setFiles] = useState([]);
  const handleFilesUpload = (files) => {
    const filesWithContent = files.filter(({ content }) => content?.length);
    setFiles((prevFiles) => [...prevFiles, ...filesWithContent]);
  };

  return (
    <div>
      <UploadFiles onFilesUploaded={handleFilesUpload} />
      <FilesList files={files} />
    </div>
  );
};

export default App;
