export const readFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      resolve({
        name: file.name,
        content: reader.result.split('\n').filter(Boolean),
      });
    });
    reader.addEventListener('error', () => {
      reject();
    });

    reader.readAsText(file);
  });
