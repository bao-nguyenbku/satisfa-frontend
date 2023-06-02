import { UpdateUser } from '@/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { baseQuery } from '@/utils/request';

type changePassword = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['Auth'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    updateInfo: build.mutation<void, { body: UpdateUser }>({
      invalidatesTags: ['Auth'],
      query({ body }) {
        return {
          url: `/users/`,
          method: 'PATCH',
          body: body,
        };
      },
    }),
    updatePassword: build.mutation<void, {body: changePassword}>({
      invalidatesTags: ['Auth'],
      query({ body }) {
        return {
          url: `/users/`,
          method: 'PATCH',
          body: body,
        };
      },
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
