import { CustomException } from "src/global/exception/model/custom-exception";
import { ErrorCode } from "src/global/exception/model/error-code";

export class InvalidTokenException extends CustomException{
    constructor(){
        super(ErrorCode.INVALID_TOKEN);
    }
}