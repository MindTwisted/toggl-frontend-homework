import { rest } from 'msw';
import { apiRoot } from '../../api/const';

const endpoint = `${apiRoot}/send`;

export const postSendSuccessHandler = rest.post(endpoint, (req, res, ctx) =>
  res(ctx.status(200)),
);

export const postSendErrorHandler = rest.post(endpoint, (req, res, ctx) =>
  res(
    ctx.status(500),
    ctx.json({
      error: 'send_failure',
      emails: ['brita20@example.net', 'heather96@example.org'],
    }),
  ),
);
