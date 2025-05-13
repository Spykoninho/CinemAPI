import {
    INestApplication,
    ValidationError,
    ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ExceptionHandlerInterceptor } from '../middlewares/exception-handler.interceptor';
import { AppModule } from '../app.module';
import { CineError } from '../utils/CineError';

export const initValidation = (app: INestApplication) => {
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(
        new ValidationPipe({
            enableDebugMessages: true,
            exceptionFactory: (errors: ValidationError[]) => {
                const validationError = new CineError(
                    'validation-errors',
                    'A validation error occurs',
                    400,
                    {
                        errors,
                    },
                );
                console.error('validation-errors', validationError);
                throw validationError;
            },
        }),
    );
    app.useGlobalFilters(new ExceptionHandlerInterceptor());
};
