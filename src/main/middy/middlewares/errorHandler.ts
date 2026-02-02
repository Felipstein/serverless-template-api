import { HttpError } from '../../../application/errors/HttpError';

import type { MiddlewareObj } from '@middy/core';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export function errorHandler(): MiddlewareObj<APIGatewayProxyEventV2> {
  return {
    onError: (request) => {
      const { error } = request;

      if(error && (error instanceof HttpError || 'statusCode' in error)) {
        request.response = {
          ...request.response,
          statusCode: error.statusCode,
          body: error.message,
          headers: {
            ...request.response?.headers,
            'Content-Type': 'application/json',
          },
        };
      } else {
        request.response = {
          ...request.response,
          statusCode: 500,
          body: JSON.stringify({ error: 'Deu ruim no servidor!' }),
          headers: {
            ...request.response?.headers,
            'Content-Type': 'application/json',
          },
        };
      }
    }
  };
}
