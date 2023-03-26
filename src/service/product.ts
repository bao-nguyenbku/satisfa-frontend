import { Product } from '@/types/data-types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { baseQuery } from '@/utils/request';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getAllProduct: build.query<Product[], void>({
      query: () => '/products'
    }),
  }),
  refetchOnFocus: true,
});

export const {
  useGetAllProductQuery,
  util: { getRunningQueriesThunk },
} = productApi;

export const { getAllProduct } = productApi.endpoints;
