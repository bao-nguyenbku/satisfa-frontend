import NextAuth from 'next-auth';
// import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
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
        BASE_API_URL + '/auth/login',
        userInput
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
  callbacks: {
    jwt: async (params) => {
      const { token, user } = params;
      if (user) {
        token.userToken = user;
      }
      return token;
    },
    session: async (params) => {
      const { session, token } = params;
      return {
        ...session,
        user: token
      };
    },
  },
});
