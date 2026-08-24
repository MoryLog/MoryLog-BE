import { CustomException } from "src/global/exception/model/custom-exception";
import { ErrorCode } from "src/global/exception/model/error-code";

export class DuplicateEmailException extends CustomException{
    constructor(){
        super(ErrorCode.DUPLICATE_EMAIL);
    }
}