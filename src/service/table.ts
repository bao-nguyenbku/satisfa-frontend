import { TableFilter, TableType } from '@/types/data-types';
import { baseQuery } from '@/utils/request';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const tableApi = createApi({
  reducerPath: 'tableApi',
  baseQuery,
  tagTypes: ['Reservations'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getAllTable: build.query<TableType[], void>({
      query: () => '/tables',
      providesTags: ['Reservations'],
    }),
    getTableByFilter: build.query<any, TableFilter | void>({
      query: (filter) => {
        return {
          url: '/tables',
          params: filter || {},
        };
      },
      providesTags: ['Reservations'],
    }),
    updateTable: build.mutation<void, { _id: string; body: TableType }>({
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
  refetchOnFocus: true,
});

export const {
  useGetAllTableQuery,
  useUpdateTableMutation,
  useGetTableByFilterQuery,
  util: { getRunningQueriesThunk },
} = tableApi;

export const { getAllTable, updateTable, getTableByFilter } = tableApi.endpoints;
