import { createHash } from 'node:crypto';

import { Inject, Injectable } from '@nestjs/common';
import type { Redis } from 'ioredis';
import type { RefreshTokenStore } from 'src/global/security/jwt/port/refresh-token-store';
import type { RefreshToken } from '../refresh-token';
import { REDIS_CLIENT } from 'src/global/module/redis.module';


@Injectable()
export class RefreshTokenRepository implements RefreshTokenStore {

  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: Redis,
  ) {}

  public async save(
    refreshToken: RefreshToken,
  ): Promise<void> {
    await this.redis.set(
      this.createKey(refreshToken.userId),
      this.createDigest(refreshToken.refreshToken),
      'EX',
      refreshToken.ttlSeconds,
    );
  }

  public async rotate(
    userId: string,
    currentRefreshToken: string,
    nextRefreshToken: RefreshToken,
  ): Promise<boolean> {
    const result = await this.redis.eval(
      `
        local storedDigest = redis.call('GET', KEYS[1])

        if not storedDigest then
          return 0
        end

        if storedDigest ~= ARGV[1] then
          return 0
        end

        redis.call(
          'SET',
          KEYS[1],
          ARGV[2],
          'EX',
          ARGV[3]
        )

        return 1
      `,
      1,
      this.createKey(userId),
      this.createDigest(currentRefreshToken),
      this.createDigest(nextRefreshToken.refreshToken),
      nextRefreshToken.ttlSeconds,
    );

    return result === 1;
  }

  public async delete(
    userId: string,
  ): Promise<void> {
    await this.redis.del(
      this.createKey(userId),
    );
  }

  private createKey(
    userId: string,
  ): string {
    return `auth:refresh-token:${userId}`;
  }

  private createDigest(
    token: string,
  ): string {
    return createHash('sha256')
      .update(token)
      .digest('hex');
  }
}