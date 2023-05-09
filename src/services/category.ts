import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { baseQuery } from '@/utils/request';
import { Category } from '@/types';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery,
  refetchOnFocus: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getAllCategoryService: build.query<Category[], void>({
      query: () => {
        return {
          url: '/categories',
        };
      },
    }),
  }),
});

export const {
  useGetAllCategoryServiceQuery,
  util: { getRunningQueriesThunk },
} = categoryApi;
