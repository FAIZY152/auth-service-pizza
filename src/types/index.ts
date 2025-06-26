import { Request } from 'express';

export type AuthCookie = {
  accessToken: string;
  refreshToken: string;
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

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  tenantId?: number;
}
export interface LimitedUserData {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  tenantId: number;
}
export interface UserQueryParams {
  perPage: number;
  currentPage: number;
}

export interface UpdateUserRequest extends Request {
  body: LimitedUserData;
}

export interface TenantQueryParams {
  q: string;
  perPage: number;
  currentPage: number;
}
