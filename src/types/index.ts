import { Request } from 'express';

export type AuthCookie = {
  accessToken: string;
  refreshToken: string;
};

export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string; // Optional, default to 'CUSTOMER'
};
export interface IRefreshTokenPayload {
  id: string;
}

export interface AuthRequest extends Request {
  auth: {
    sub: string;
    role: string;
    id?: string;
  };
}

export interface ITenate {
  name: string;
  address: string;
}

export interface TenateRequest extends Request {
  body: ITenate;
}

export interface TenantQueryParams {
  q: string;
  perPage: number;
  currentPage: number;
}
