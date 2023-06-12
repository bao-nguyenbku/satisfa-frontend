import NextAuth, { DefaultSession } from 'next-auth';
import JWT from 'next-auth/jwt';

interface CustomUser {
  accessToken?: string;
  refreshToken?: string;
}

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    refreshToken: string;
  }
  interface User extends CustomUser {
    id?: string;
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    provider?: string;
    accessToken?: string;
    refreshToken?: string;
    expireIn?: number;
  }
}
