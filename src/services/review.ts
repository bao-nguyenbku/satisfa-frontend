import { Review, ReviewFilter } from '@/types';
import { baseQuery } from '@/utils/request';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getReviewsService: build.query<Review[], ReviewFilter | void>({
      query: (filter) => {
        return {
          url: '/reviews',
          params: filter || {},
        };
      },
    }),
    createReviewService: build.mutation<Review, any>({
      query: (body) => {
        return {
          url: '/reviews/create',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const {
  useGetReviewsServiceQuery,
  useCreateReviewServiceMutation,
  util: { getRunningQueriesThunk },
} = reviewApi;

// export const { } = reviewApi.endpoints;
