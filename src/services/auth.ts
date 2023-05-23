import { CreateUser, User } from '@/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { baseQuery } from '@/utils/request';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    register: build.mutation<User, CreateUser>({
      query(body) {
        return {
          url: '/auth/register',
          method: 'POST',
          body,
        };
      },
    }),
    authCurrentUserService: build.query<User, void>({
      query: () => '/auth/me',
    }),
  }),
  refetchOnFocus: true,
});

export const {
  useRegisterMutation,
  util: { getRunningQueriesThunk },
} = authApi;

export const { register } = authApi.endpoints;
