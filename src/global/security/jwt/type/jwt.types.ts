export const JWT_ALGORITHM = 'HS512' as const

export const JWT_TOKEN_TYPE = {
  ACCESS: 'access',
  REFRESH: 'refresh',
} as const

export type JwtTokenType =
  (typeof JWT_TOKEN_TYPE)[keyof typeof JWT_TOKEN_TYPE]

export type JwtPayload = {
  sub: string
  typ: JwtTokenType
  jti: string
  iat: number
  exp: number
}

export type TokenResponse = {
  accessToken: string
  refreshToken: string
}

export type IssuedTokenPair = TokenResponse & {
  refreshTokenTtlSeconds: number
}