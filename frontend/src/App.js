import { useState } from 'react';
import { UploadFiles } from './components/UploadFiles';
import { FilesList } from './components/FilesList';
import { postSend } from './api/postSend';
import { Loader } from './components/Loader';
import { SuccessMessage } from './components/SuccessMessage';
import { ErrorMessage } from './components/ErrorMessage';

const App = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState(null);
  const handleFilesUpload = (files) => {
    const filesWithContent = files.filter(({ content }) => content?.length);
    setFiles((prevFiles) => [...prevFiles, ...filesWithContent]);
    setShowSuccessMessage(false);
    setError(null);
  };
  const handleSendEmails = async () => {
    const emails = files.reduce((acc, curr) => [...acc, ...curr.content], []);

    try {
      setIsLoading(true);
      setShowSuccessMessage(false);
      setError(null);
      const res = await postSend({ emails });
      if (res.status === 200) {
        setShowSuccessMessage(true);
        setFiles([]);
      } else {
        const errorData = await res.json();
        setError(errorData);
      }
    } catch (e) {
      setError({});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <UploadFiles onFilesUploaded={handleFilesUpload} />
      <FilesList files={files} />

      {files.length > 0 && (
        <div>
          <button onClick={handleSendEmails} disabled={isLoading}>
            Send emails
          </button>
        </div>
      )}
      {isLoading && <Loader />}
      {showSuccessMessage && <SuccessMessage />}
      {Boolean(error) && (
        <ErrorMessage error={error.error} emails={error.emails} />
      )}
    </div>
  );
};

export default App;
