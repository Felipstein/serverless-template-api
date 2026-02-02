import type { IController } from '../types/IController';
import type { IHttpRequest, IHttpResponse } from '../types/IHttp';

export class UpateUserController implements IController {
  async handler({ params }: IHttpRequest<undefined>): Promise<IHttpResponse> {
    return {
      statusCode: 200,
      body: {
        userId: params?.userId,
      },
    };
  }
}
