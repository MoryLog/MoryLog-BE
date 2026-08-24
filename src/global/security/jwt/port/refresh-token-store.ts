import { RefreshToken } from "src/domain/user/infrastructure/security/refresh-token/refresh-token";

export interface RefreshTokenStore {
  save(refreshToken: RefreshToken): Promise<void>;
  rotate(userId: string, currentRefreshToken: string, nextRefreshToken: RefreshToken): Promise<boolean>;
  delete(userId: string): Promise<void>;
}