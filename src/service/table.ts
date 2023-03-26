import { TableType } from '@/types/data-types';
import { baseQuery } from '@/utils/request';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const tableApi = createApi({
  reducerPath: 'tableApi',
  baseQuery,
  tagTypes: ['Table'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getAllTable: build.query<TableType[], void>({
      query: () => '/tables',
      providesTags: ['Table'],
    }),
    updateTable: build.mutation<void, { _id: string; body: TableType }>({
      query({ _id, body }) {
        return {
          url: `/tables/${_id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: ['Table'],
    }),
  }),
  refetchOnFocus: true,
});

export const {
  useGetAllTableQuery,
  useUpdateTableMutation,
  util: { getRunningQueriesThunk },
} = tableApi;

export const { getAllTable, updateTable } = tableApi.endpoints;
