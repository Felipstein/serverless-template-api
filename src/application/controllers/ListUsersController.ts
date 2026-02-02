import type { IController } from '../types/IController';
import type { IHttpResponse } from '../types/IHttp';

export class ListUsersController implements IController {
  async handler(): Promise<IHttpResponse> {
    return {
      statusCode: 200,
      body: {
        users: ['List de usuários...'],
      },
    };
  }
}
