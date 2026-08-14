import { HttpStatus } from "@nestjs/common";
import { ErrorCodeType } from "./error-code";

export class ErrorResponse{
    private constructor(
        private readonly errorCodeName: string,
        public readonly status: number,
        private readonly message: string,
        private readonly timestamp: string,
        private readonly path: string
    ){}

    public static of(
        errorCode: ErrorCodeType, 
        path: string, 
        message: string = errorCode.message
    ): ErrorResponse{
        return new ErrorResponse(
            errorCode.name,
            errorCode.status.valueOf(),
            message,
            new Date().toISOString(),
            path
        );
    }

    public static ofHttpException(
        status: number,
        message: string,
        path: string
    ): ErrorResponse{
        return new ErrorResponse(
            HttpStatus[status] ?? "HTTP_EXCEPTION",
            status,
            message,
            new Date().toISOString(),
            path
        );
    }
}