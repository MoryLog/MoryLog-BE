import { createHash } from 'crypto';

export class RefreshToken {
  private constructor(
    public readonly userId: string,
    public readonly refreshToken: string,
    public readonly ttlSeconds: number,
  ) {}

  public static create(params: {
    userId: string;
    refreshToken: string;
    ttlSeconds: number;
  }): RefreshToken {
    return new RefreshToken(
      params.userId,
      params.refreshToken,
      params.ttlSeconds,
    );
  }

  public digest(): string {
    return createHash('SHA256')
      .update(this.refreshToken)
      .digest('hex');
  }
}