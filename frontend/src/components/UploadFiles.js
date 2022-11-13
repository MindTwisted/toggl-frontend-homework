import { readFile } from '../utils/readFile';

export const UploadFiles = ({ onFilesUploaded }) => {
  const onChange = async (e) => {
    if (typeof onFilesUploaded === 'function') {
      const files = (
        await Promise.allSettled(
          Array.from(e.target.files).map((file) => readFile(file)),
        )
      )
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value);

      onFilesUploaded(files);
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept=".txt"
        title="Choose files"
        onChange={onChange}
      />
    </div>
  );
};
