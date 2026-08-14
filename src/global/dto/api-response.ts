import { HttpStatus } from "@nestjs/common";

export class APIResponse<T=unknown>{
    private success: boolean;

    private data?: T;

    // Exception을 반환할 경우에는 errorCode, message, status가 있어야함
    // 올바른 값을 반환할 때에 message와 status를 포함하지 않는 이유는 후속 처리가 필요 없을 것 같기 때문
    // Exception 상황에서는 후속 처리가 필요하지만 Exception 상황에서는 필요 없음.
    private errorCode?: string;
    private message?: string;
    private status?: HttpStatus;


    private constructor(param: {
        success: boolean,
        data?: T,
        errorCode?: string,
        message?: string,
        status?: HttpStatus,
    }){
        this.success = param.success;
        this.data = param.data;
        this.errorCode = param.errorCode;
        this.message = param.message;
        this.status = param.status;
    }

    
    public static sucess<T>(data: T): APIResponse<T>{
        return new APIResponse<T>({
            success: true,
            data: data
        });
    }

    public static error(errorCode: string, message: string, status: HttpStatus): APIResponse<never>{
        return new APIResponse<never>({
            success: false,
            errorCode: errorCode,
            message: message,
            status: status
        });
    }
}