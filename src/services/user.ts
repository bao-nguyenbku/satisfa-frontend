import { CreateUser, User } from '@/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { baseQuery } from '@/utils/request';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    updateInfo: build.mutation<void, {body: Omit<User, 'id'>}>({
      query({ body }) {
        return {
          url: `/users/`,
          method: 'PATCH',
          body: body,
        };
      },
    }),
    updatePassword: build.mutation<Omit<CreateUser, 'email fullname'>, void>({
      query: () => '/users',
    }),
  }),
  refetchOnFocus: true,
});

export const {
  useUpdatePasswordMutation,
  useUpdateInfoMutation,
  util: { getRunningQueriesThunk },
} = userApi;

export const { updateInfo } = userApi.endpoints;
