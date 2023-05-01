import NextAuth, { NextAuthOptions } from 'next-auth';
// import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
import { BASE_URL, NEXTAUTH_SECRET, DEV_MODE } from '@/constants';

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
      try {
        const response = await axios.post(BASE_URL + '/auth/login', {
          email: userInput.email,
          password: userInput.password,
        });
        console.log(
          '🚀 ~ file: [...nextauth].ts:31 ~ authorize ~ response:',
          response,
        );
        return response && response?.data?.accessToken;
      } catch (error: any) {
        throw new Error(JSON.stringify(error.response.data));
      }
    },
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    authorization: {
      params: {
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code',
      },
    },
  }),
];

export const authOptions: NextAuthOptions = {
  providers,
  secret: NEXTAUTH_SECRET,
  debug: DEV_MODE,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  cookies: {
    sessionToken: {
      name: `next-auth-landing.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: true,
      },
    },
    callbackUrl: {
      name: `next-auth-landing.callback-url`,
      options: {
        sameSite: 'strict',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: `next-auth-landing.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: true,
      },
    },
  },
  callbacks: {
    jwt: async (params) => {
      const { token, account } = params;
      if (account) {
        token.provider = account.provider;
      }
      const response = await axios.post(BASE_URL + '/auth/google', {
        ...token,
        avatar: token.picture,
        id: token.sub,
      });
      if (response) {
        return {
          ...token,
          accessToken: response.data.accessToken,
        };
      }

      return token;
    },
    session: async (params) => {
      const { session, token } = params;
      // console.log('Session: ', {
      //   session,
      //   token,
      //   user,
      // });
      session.token = token.accessToken as string;
      return session;
    },
    signIn: async () => {
      // console.log('🚀 ~ file: [...nextauth].ts:82 ~ signIn: ~ params:', params);
      return true;
    },
  },
};
export default NextAuth(authOptions);
