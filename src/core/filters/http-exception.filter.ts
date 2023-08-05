import { AppConfigService } from '#config';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ERROR_CODES } from './error-codes.const';
import { ExceptionResponse } from './interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: AppConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    const exceptionResponse = exception.getResponse() as ExceptionResponse;
    const code = this.getClientErrorCode(exceptionResponse);

    response
      .status(exception.getStatus())
      .send({ error: exceptionResponse.error, code });
  }

  private getClientErrorCode(exception: ExceptionResponse): string {
    const { message } = exception;
    return this.configService.environment === 'production'
      ? ERROR_CODES[message]
      : message;
  }
}
