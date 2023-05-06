import NextAuth, { DefaultSession } from 'next-auth';
import JWT from 'next-auth/jwt';

interface CustomUser {
  accessToken?: string;
}

declare module 'next-auth' {
  interface Session {
    token: string;
  }
  interface User extends CustomUser {
    id?: string;
  }

}
declare module 'next-auth/jwt' {
  interface JWT {
    provider?: string;
    jwt?: string;
  }
}
