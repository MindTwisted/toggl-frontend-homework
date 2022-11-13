import { setupServer } from 'msw/node';
import { postSendSuccessHandler } from './handlers';

export const server = setupServer(postSendSuccessHandler);
