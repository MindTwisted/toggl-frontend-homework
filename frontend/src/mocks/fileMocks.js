export const file1Mock = new File(
  ['john@example.com\n', 'smith@example.com\n'],
  'emails-1.txt',
  {
    type: 'text/plain',
  },
);

export const file2Mock = new File(['michael@example.com\n'], 'emails-2.txt', {
  type: 'text/plain',
});
