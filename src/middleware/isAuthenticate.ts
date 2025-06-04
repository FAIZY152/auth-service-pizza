// src/middleware/jwtAuth.ts

import { expressjwt, GetVerificationKey } from 'express-jwt';
import { Request } from 'express';
import jwksClient from 'jwks-rsa';
import { Config } from '../config/fileImport';
import { AuthCookie } from '../types';

// Setup JWKS client for dynamic public key retrieval
const jwks = jwksClient.expressJwtSecret({
  jwksUri: Config.JWKS_URI!,
  cache: true,
  rateLimit: true,
}) as GetVerificationKey;

// Custom token extractor: header or cookie
function extractToken(req: Request): string | undefined {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (token && token !== 'undefined') return token;
  }

  const { accessToken } = req.cookies as AuthCookie;
  return accessToken;
}

// JWT middleware export
export default expressjwt({
  secret: jwks,
  algorithms: ['RS256'],
  getToken: extractToken,
});
