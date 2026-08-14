import { ArgumentsHost, Catch, ExceptionFilter, Injectable, Logger } from "@nestjs/common";
import { CustomException } from "./model/custom-exception";
import { ErrorResponse } from "./model/error-response";
import { type Request, type Response } from 'express';
import { ErrorCode } from "./model/error-code";

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter{
    private readonly logger = new Logger(GlobalExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const httpContext = host.switchToHttp();

        const request = httpContext.getRequest<Request>();
        const response = httpContext.getResponse<Response>();

        if(exception instanceof CustomException){
            this.handleCustomException(exception, request, response);
            return;
        }

        // 모든 Exception은 CustomException 으로 구현할 예정이며, 
        // 그렇지 않은 예외는 handleUnknownException() 으로 처리한다.
        this.handleUnknownException(exception, request, response);
    }

    private handleCustomException(
        exception: CustomException, 
        request: Request, 
        response: Response
    ): void{
        const errorCode = exception.getErrorCode();

        const errorResponse = ErrorResponse.of(
            errorCode,
            request.originalUrl
        );

        this.logger.warn(
            `${request.method} ${request.originalUrl} - ` +
            `${errorCode.status.valueOf()}: ${exception.message}`,
        );
        
        response
            .status(errorCode.status)
            .json(errorResponse)
    }

    private handleUnknownException(
        exception: unknown, 
        request: Request, 
        response: Response
    ): void{
        const error = exception instanceof Error ? exception : new Error(String(exception));

        this.logger.error(
            `${request.method} ${request.originalUrl} - 예상치 못한 에러 발생`,
            error.stack,
        );

        const errorResponse = ErrorResponse.of(
            ErrorCode.INTERNAL_SERVER_ERROR,
            request.originalUrl
        );
        
        response
            .status(errorResponse.status)
            .json(errorResponse)
    }
}