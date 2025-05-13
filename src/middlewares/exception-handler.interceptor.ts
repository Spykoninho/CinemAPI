import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { ErrorResponse } from './exception.model';
import { CineError } from '../utils/CineError';
import { Response } from 'express';
import * as util from 'util';

@Catch()
export class ExceptionHandlerInterceptor implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let errorContext: any = {};
        let status = 500;
        let code = 'internal-server-error';
        let message = 'An unexpected error occurred';

        const logFullError = (errorObject: object) => {
            console.error(
                util.inspect(errorObject, { depth: null, colors: true }),
            );
        };

        if (exception instanceof HttpException) {
            code = exception.name;
            status = exception.getStatus?.() ?? 500;
            message = exception.message;
            errorContext = exception.stack;

            logFullError({
                type: exception.constructor.name,
                name: exception.name,
                message: exception.message,
                stack: exception.stack,
                response: exception.getResponse?.(),
            });
        } else if (exception instanceof CineError) {
            code = exception.code;
            status = exception.status ?? 500;
            message = exception.message;
            errorContext = exception.context;

            logFullError({
                type: exception.constructor.name,
                name: exception.name,
                message: exception.message,
                stack: exception.stack,
                context: exception.context,
            });
        } else if (exception instanceof Error) {
            code = exception.name;
            status = 500;
            message = exception.message;
            errorContext = { stack: exception.stack };

            logFullError({
                type: exception.constructor.name,
                name: exception.name,
                message: exception.message,
                stack: exception.stack,
            });
        } else {
            logFullError({
                message: 'Unknown exception caught in filter',
                value: exception,
            });
        }

        const errorResponse: ErrorResponse = {
            code,
            status,
            message,
            timestamp: new Date().toISOString(),
        };

        response.status(status).json(errorResponse);
    }
}
