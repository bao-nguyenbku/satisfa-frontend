import { CreateUser, User } from '@/types/data-types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { BASE_URL } from '@/constants';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
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
  }),
  refetchOnFocus: true,
});

export const {
  useRegisterMutation,
  util: { getRunningQueriesThunk },
} = authApi;

export const { register } = authApi.endpoints;
