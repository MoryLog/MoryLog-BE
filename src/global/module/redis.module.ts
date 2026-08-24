import { Module } from "@nestjs/common";
import Redis from "ioredis";
import { env } from "../config/env";


export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

@Module({
    providers: [
        {
            provide: REDIS_CLIENT,
            useFactory: () => {
                return new Redis({
                    host: env.redis.host,
                    port: Number(env.redis.port),
                    password: env.redis.password
                });
            }
        }
    ],
    exports: [REDIS_CLIENT]
})
export class RedisModule {}