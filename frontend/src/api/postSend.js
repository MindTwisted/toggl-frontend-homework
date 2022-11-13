import { apiRoot } from './const';

export const postSend = ({ emails }) =>
  fetch(`${apiRoot}/send`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ emails }),
  });
