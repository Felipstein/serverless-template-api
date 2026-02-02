import { randomUUID } from 'node:crypto';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { HttpError } from '../errors/HttpError';

import type { IHttpRequest, IHttpResponse } from '../types/IHttp';
import type { IController } from '../types/IController';
import type { IFile } from '../types/IFile';

interface IControllerBody {
  file: IFile;
}

export class UploadController implements IController<IControllerBody> {
  constructor(private readonly s3Client: S3Client) {}

  async handler(request: IHttpRequest<IControllerBody>): Promise<IHttpResponse> {
    const { file } = request.body;

    if (!file) {
      throw new HttpError(400, { error: 'File is required!' });
    }

    const newFileName = `${randomUUID()}-${file.filename}`;

    const putObjectCommand = new PutObjectCommand({
      Bucket: '<BUCKET NAME>',
      Key: newFileName,
      Body: file.content,
    });

    await this.s3Client.send(putObjectCommand);

    return {
      statusCode: 200,
      body: {
        filename: newFileName,
      },
    };
  }
}
