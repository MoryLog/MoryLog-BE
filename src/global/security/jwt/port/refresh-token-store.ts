import type { RefreshToken } from "src/domain/user/infrastructure/security/refresh-token/refresh-token";

export const REFRESH_TOKEN_STORE = Symbol('REFRESH_TOKEN_STORE');

export interface RefreshTokenStore {
  save(refreshToken: RefreshToken): Promise<void>;
  rotate(userId: string, currentRefreshToken: string, nextRefreshToken: RefreshToken): Promise<boolean>;
  delete(userId: string): Promise<void>;
}
