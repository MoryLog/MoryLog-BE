import { HttpStatus } from "@nestjs/common";

export const ErrorCode = {
    INTERNAL_SERVER_ERROR: {
        name: "INTERNAL_SERVER_ERROR",
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "서버 에러 입니다."
    },

    DUPLICATE_EMAIL: {
        name: "DUPLICATE_EMAIL",
        status: HttpStatus.CONFLICT,
        message: "이미 존재하는 이메일입니다."
    },

    USER_NOT_FOUND: {
        name: "USER_NOT_FOUND",
        status: HttpStatus.NOT_FOUND,
        message: "유저가 존재하지 않습니다."
    },

    INVALID_PASSWORD: {
        name: "INVALID_PASSWORD",
        status: HttpStatus.UNAUTHORIZED,
        message: "비밀번호가 올바르지 않습니다."
    },

    INVALID_TOKEN: {
        name: "INVALID_TOKEN",
        status: HttpStatus.UNAUTHORIZED,
        message: "유효하지 않은 토큰입니다."
    },

    EXPIRED_TOKEN: {
        name: "EXPIRED_TOKEN",
        status: HttpStatus.UNAUTHORIZED,
        message: "만료된 토큰입니다."
    }
} as const

export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];