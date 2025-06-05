import { expressjwt, Request as JWTRequest } from 'express-jwt';
import { Request } from 'express';
import { AuthCookie, IRefreshTokenPayload } from '../types';
import { AppDataSource } from '../config/data-source';
import { RefreshToken } from '../entity/RefreshToken';
import { Config } from '../config/fileImport';
import Logger from '../config/Logger';

/**
 * Middleware to validate and revoke refresh tokens via JWT
 */
export default expressjwt({
  secret: Config.REFRESH_TOKEN_SECRET!,
  algorithms: ['HS256'],

  /**
   * Extract token from signed cookies
   */
  getToken(req: Request): string | undefined {
    const cookies = req.cookies as AuthCookie;
    return cookies?.refreshToken;
  },

  /**
   * Check if the token has been revoked (e.g., removed from DB)
   */
  async isRevoked(req: JWTRequest, token): Promise<boolean> {
    const payload = token?.payload as IRefreshTokenPayload;

    try {
      const refreshTokenRepo = AppDataSource.getRepository(RefreshToken);

      const refreshToken = await refreshTokenRepo.findOne({
        where: {
          id: Number(payload?.id),
          user: { id: Number(token?.payload?.sub) },
        },
      });

      return !refreshToken; // If not found, it's revoked
    } catch (err) {
      Logger.error('Error checking refresh token revocation', {
        tokenId: payload?.id,
        error: (err as Error).message,
      });
      return true; // Safe default: revoke on error
    }
  },
});
