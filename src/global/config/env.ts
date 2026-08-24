import 'dotenv/config';

export const env = {
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },

    aws_image_storage: {
        AWS_REGION: process.env.AWS_REGION,
        AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
    },

    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD || undefined,
    },

    jwt: {
        JWT_HEADER: process.env.JWT_HEADER,
        JWT_PREFIX: process.env.JWT_PREFIX,
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
        JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
        JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION
    }
} as const