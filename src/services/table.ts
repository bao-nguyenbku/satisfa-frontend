import { Table, TableFilter } from '@/types';
import { baseQuery } from '@/utils/request';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const tableApi = createApi({
  reducerPath: 'tableApi',
  baseQuery,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: ['Reservations'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getAllTable: build.query<Table[], void>({
      query: () => '/tables',
    }),
    getTablesByFilter: build.query<Table[], TableFilter | void>({
      query: (filter) => {
        return {
          url: '/tables',
          params: filter || {},
        };
      },
    }),
    updateTable: build.mutation<void, { _id: string; body: Table }>({
      query({ _id, body }) {
        return {
          url: `/tables/${_id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: ['Reservations'],
    }),
  }),
});

export const {
  useGetAllTableQuery,
  useUpdateTableMutation,
  useGetTablesByFilterQuery,
  util: { getRunningQueriesThunk },
} = tableApi;

export const { getAllTable, updateTable, getTablesByFilter } =
  tableApi.endpoints;
