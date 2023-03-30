import { Order } from '@/types/data-types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { baseQuery } from '@/utils/request';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Order'],
  endpoints: (build) => ({
    createOrderService: build.mutation<any, any>({
      query: (body) => {
        return {
          url: '/orders/create',
          method: 'POST',
          body,
        };
      },
    }),
    updateOrderService: build.mutation<any, Partial<Order>>({
      invalidatesTags: ['Order'],
      query: (updateData) => {
        const { id, ...rest } = updateData;
        return {
          url: `/orders/${id}`,
          method: 'PATCH',
          body: rest,
        };
      },
    }),
  }),
  refetchOnFocus: true,
});

export const {
  useCreateOrderServiceMutation,
  useUpdateOrderServiceMutation,
  util: { getRunningQueriesThunk },
} = orderApi;

export const { createOrderService } = orderApi.endpoints;
