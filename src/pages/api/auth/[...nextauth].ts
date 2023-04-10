import NextAuth, { NextAuthOptions } from 'next-auth';
// import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
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
      console.log(
        '🚀 ~ file: [...nextauth].ts:26 ~ authorize ~ userInput:',
        userInput,
      );
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
];

export const authOptions: NextAuthOptions = {
  providers,
  secret: NEXTAUTH_SECRET,
  debug: DEV_MODE,
  pages: {
    signIn: '/login',
    error: '/login',
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
};
export default NextAuth(authOptions);
