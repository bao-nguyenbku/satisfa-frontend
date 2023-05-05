import NextAuth, { DefaultSession } from 'next-auth';
import JWT from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      jwtToken: string;
    } & DefaultSession['user'],
    token: string;
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    provider?: string;
  }
}
