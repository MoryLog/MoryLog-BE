import { FileTypeValidator, Injectable, MaxFileSizeValidator, ParseFilePipe } from "@nestjs/common";

@Injectable()
export class ProfileImageValidationPipe extends ParseFilePipe {
    constructor() {
        super({
            validators: [
                new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
                new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/ }),
            ],
        });
    }
}