import { HttpStatus } from "@nestjs/common";

export const ErrorCode = {
    INTERNAL_SERVER_ERROR: {
        name: "INTERNAL_SERVER_ERROR",
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "서버 에러 입니다."
    },
} as const

export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];