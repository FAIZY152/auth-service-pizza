// import jwt from 'jsonwebtoken';
// import { Response } from 'express';
// import { User } from '../entity/User';
// import { Config } from '../config/fileImport';

// const ACCESS_EXPIRES_IN = '1d';
// const REFRESH_EXPIRES_IN = '365d';

// const accessCookieOptions = {
//   domain: 'localhost',
//   sameSite: 'strict' as const,
//   httpOnly: true,
//   maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
// };

// const refreshCookieOptions = {
//   domain: 'localhost',
//   sameSite: 'strict' as const,
//   httpOnly: true,
//   maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
// };

// export class TokenService {
//   static generateTokens(user: User): {
//     accessToken: string;
//     refreshToken: string;
//   } {
//     const accessToken = jwt.sign(
//       { role: user.role },
//       Config.ACCESS_TOKEN_SECRET!,
//       {
//         subject: String(user.id),
//         expiresIn: ACCESS_EXPIRES_IN,
//       }
//     );

//     const refreshToken = jwt.sign(
//       { id: user.id },
//       Config.REFRESH_TOKEN_SECRET!,
//       {
//         subject: String(user.id),
//         expiresIn: REFRESH_EXPIRES_IN,
//       }
//     );

//     return { accessToken, refreshToken };
//   }

//   static setCookies(res: Response, tokens: {
//     accessToken: string;
//     refreshToken: string;
//   }): void {
//     res.cookie('accessToken', tokens.accessToken, accessCookieOptions);
//     res.cookie('refreshToken', tokens.refreshToken, refreshCookieOptions);
//   }
// }

// export function setTokenCookie(res: Response, name: string, token: string): void {
//   const options = name === 'accessToken' ? accessCookieOptions : refreshCookieOptions;
//   res.cookie(name, token, options);
// }
