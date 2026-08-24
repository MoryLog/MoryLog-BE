import { Injectable } from "@nestjs/common";
import { UserRepository } from "../domain/repository/user.repository";
import { BcryptPasswordEncoder } from "../infrastructure/security/password/bcrypt-password-encoder";
import { SignupUserRequest } from "./dto/request/signup.request";
import { DuplicateEmailException } from "./exception/duplicate-email.exception";
import { User } from "../domain/user";
import { S3ImageStorageService } from "src/global/storage/s3-image-storage.service";


@Injectable()
export class LocalSignupService{
    constructor(
        private readonly repository: UserRepository,
        private readonly passwordEncoder: BcryptPasswordEncoder,
        private readonly imageStorageService: S3ImageStorageService
    ){}

    async signup(request: SignupUserRequest, profileImage: Express.Multer.File){
        if(await this.repository.existsByEmail(request.email)){
            throw new DuplicateEmailException();
        }

        const profileImageUrl = await this.imageStorageService.upload(profileImage, "profile-images");

        const user = User.create({
                email: request.email,
                blogName: request.blogName,
                profileImageUrl: profileImageUrl,
                passwordHash: (await this.passwordEncoder.encode(request.password)).toString()
            });

        try{
            await this.repository.save(user);
        } catch(error){
            await this.imageStorageService.delete(profileImageUrl);
            throw error;
        }
    }
}