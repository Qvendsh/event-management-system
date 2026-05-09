import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

type ErrorResponseBody = {
    statusCode: number;
    message: string | string[];
    error?: string;
    timestamp: string;
    path: string;
    method: string;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        const context = host.switchToHttp();

        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();

        const statusCode =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse =
            exception instanceof HttpException ? exception.getResponse() : null;

        const { message, error } = this.normalizeExceptionResponse(
            exceptionResponse,
            statusCode,
        );

        const responseBody: ErrorResponseBody = {
            statusCode,
            message,
            ...(error && { error }),
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
        };

        response.status(statusCode).json(responseBody);
    }

    private normalizeExceptionResponse(
        exceptionResponse: string | object | null,
        statusCode: number,
    ): {
        message: string | string[];
        error?: string;
    } {
        if (typeof exceptionResponse === 'string') {
            return {
                message: exceptionResponse,
                error: this.getDefaultError(statusCode),
            };
        }

        if (exceptionResponse && typeof exceptionResponse === 'object') {
            const response = exceptionResponse as Record<string, unknown>;

            return {
                message:
                    typeof response.message === 'string' || Array.isArray(response.message)
                        ? response.message
                        : this.getDefaultMessage(statusCode),
                error:
                    typeof response.error === 'string'
                        ? response.error
                        : this.getDefaultError(statusCode),
            };
        }

        return {
            message: this.getDefaultMessage(statusCode),
            error: this.getDefaultError(statusCode),
        };
    }

    private getDefaultMessage(statusCode: number): string {
        if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
            return 'Internal server error';
        }

        return 'Request failed';
    }

    private getDefaultError(statusCode: number): string | undefined {
        if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
            return 'Internal Server Error';
        }

        return undefined;
    }
}