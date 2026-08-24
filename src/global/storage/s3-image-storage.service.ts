import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { env } from "../config/env";
import { extname } from "node:path";
import { randomUUID } from "node:crypto";

@Injectable()
export class S3ImageStorageService{
    private readonly s3Client?: S3Client;
    private readonly buket?: string;

    constructor(){
        this.s3Client = new S3Client({
            region: env.aws_image_storage.AWS_REGION,
        });

        this.buket = env.aws_image_storage.AWS_S3_BUCKET;
    }

    async upload(
        file: Express.Multer.File,
        directory: string
    ): Promise<string>{
        const extension = extname(file.originalname);

        const key = `${directory}/${randomUUID()}${extension}`;

        await this.s3Client?.send(
            new PutObjectCommand({
                Bucket: this.buket,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype
            })
        );

        return key;
    }

    async delete(key: string): Promise<void>{
        await this.s3Client?.send(
            new DeleteObjectCommand({
                Bucket: this.buket,
                Key: key
            })
        );
    }
}