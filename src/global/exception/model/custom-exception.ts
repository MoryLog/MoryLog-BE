import { HttpException } from "@nestjs/common";
import { ErrorCodeType } from "./error-code";

export class CustomException extends HttpException{
    constructor(private readonly errorCode: ErrorCodeType){
        super(errorCode.message, errorCode.status);
    }

    getErrorCode(): ErrorCodeType{
        return this.errorCode
    }
}