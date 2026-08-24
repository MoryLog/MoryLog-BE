import { CustomException } from "src/global/exception/model/custom-exception";
import { ErrorCode } from "src/global/exception/model/error-code";

export class UserNotFoundException extends CustomException{
    constructor(){
        super(ErrorCode.USER_NOT_FOUND)
    }
}