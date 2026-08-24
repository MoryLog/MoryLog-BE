import { CustomException } from "src/global/exception/model/custom-exception";
import { ErrorCode } from "src/global/exception/model/error-code";

export class ExpiredTokenException extends CustomException{
    constructor(){
        super(ErrorCode.EXPIRED_TOKEN);
    }
}