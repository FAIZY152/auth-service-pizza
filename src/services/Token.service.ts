import fs from 'node:fs';
import path from 'node:path';
import { JwtPayload, sign } from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { Config } from '../config/fileImport';
import { RefreshToken } from '../entity/RefreshToken';

export function generateAccessToken(payload: JwtPayload): string {
  let privateKey: Buffer;

  try {
    privateKey = fs.readFileSync(
      path.join(__dirname, '../../keys/private.pem'),
    );
  } catch (err) {
    const error = createHttpError(500, 'Error while reading private key');
    throw error;
  }

  const accessToken = sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '1d',
    issuer: 'auth-service',
  });

  return accessToken;
}

/**
 * Generates a refresh token using a shared secret
 */
export function generateRefreshToken(payload: JwtPayload): string {
  const refreshToken = sign(payload, Config.REFRESH_TOKEN_SECRET!, {
    algorithm: 'HS256',
    expiresIn: '1y',
    issuer: 'auth-service',
    jwtid: String(payload.id),
  });

  return refreshToken;
}

export async function persistRefreshToken(
  refreshTokenRepository: Repository<RefreshToken>,
  user: User,
) {
  const MS_IN_YEAR = 1000 * 60 * 60 * 24 * 365;

  const newRefreshToken = await refreshTokenRepository.save({
    user: user,
    expiresAt: new Date(Date.now() + MS_IN_YEAR),
  });

  return newRefreshToken;
}
