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
