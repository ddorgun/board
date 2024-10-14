import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ServiceException } from '../exceptions/service.exception';
import { Request, Response } from 'express';

@Catch(ServiceException)
export class ServiceExceptionToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.errorCode.status;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      path: request.url,
      timestamp: new Date(),
    });
  }
}
