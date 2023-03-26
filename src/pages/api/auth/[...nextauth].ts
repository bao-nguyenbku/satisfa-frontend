import NextAuth from 'next-auth';
// import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { NEXTAUTH_URL, BASE_URL, NEXTAUTH_SECRET, DEV_MODE } from '@/constants';

const providers = [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: 'Credentials',
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: {
        type: 'email',
      },
      password: {
        type: 'password',
      },
    },
    async authorize(credentials) {
      // Add logic here to look up the user from the credentials supplied
      const userInput = { ...credentials };
      const response = await axios.post(
        (NEXTAUTH_URL || BASE_URL) + '/auth/login',
        userInput,
      );
      if (response) {
        return response.data.accessToken;
      }
      return null;
    },
  }),
];

export default NextAuth({
  providers,
  secret: NEXTAUTH_SECRET,
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
  debug: DEV_MODE,
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token.landing',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        domain: NEXTAUTH_URL,
        secure: true,
      },
    },
    callbackUrl: {
      name: 'next-auth.callback-url.landing',
      options: {
        httpOnly: true,
        secure: true,
      },
    },
    csrfToken: {
      name: 'next-auth.csrf-token.landing',
      options: {
        httpOnly: true,
        secure: true,
      },
    },
  },
  callbacks: {
    jwt: async (params) => {
      const { token, user } = params;
      if (user) {
        token.jwt = user;
      }
      return token;
    },
    session: async (params) => {
      const { session, token } = params;
      session.user.jwtToken = token.jwt as string;
      return session;
    },
  },
});
