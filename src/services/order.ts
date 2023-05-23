import { CreateOrder, Order } from '@/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { baseQuery } from '@/utils/request';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery,
  refetchOnFocus: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Order'],
  endpoints: (build) => ({
    getAllOrderByCurrentUser: build.query<Order[], void>({
      query: () => {
        return {
          url: '/orders/current-user',
        };
      },
    }),
    createOrderService: build.mutation<Order, CreateOrder>({
      query: (body) => {
        return {
          url: '/orders/create',
          method: 'POST',
          body,
        };
      },
    }),
    createOrderByGuestService: build.mutation<Order, CreateOrder>({
      query: (body) => {
        return {
          url: '/orders/create-guest',
          method: 'POST',
          body,
        };
      },
    }),
    createPaidOrderService: build.mutation<any, any>({
      query: (body) => {
        const { id, ...rest } = body;
        return {
          url: `/orders/${id}/paid`,
          method: 'PATCH',
          body: rest.paymentData,
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
});

export const {
  useCreateOrderServiceMutation,
  useUpdateOrderServiceMutation,
  useCreateOrderByGuestServiceMutation,
  useGetAllOrderByCurrentUserQuery,
  useCreatePaidOrderServiceMutation,
  util: { getRunningQueriesThunk },
} = orderApi;

export const { createOrderService, createPaidOrderService } =
  orderApi.endpoints;
