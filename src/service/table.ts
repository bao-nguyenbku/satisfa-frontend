import { TableType } from "@/types/data-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { BASE_URL } from "@/constants";

export const tableApi = createApi({
    reducerPath: "tableApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
          return action.payload[reducerPath];
        }
      },
      endpoints: (build) => ({
        getAllTable: build.query<any, void>({
          query: () => "/tables",
        }),
        updateTable: build.mutation<any, TableType>({
          query(body) {
            console.log(body)
            return {
              url: '/tables/update',
              method: 'patch',
              body
            }
          }
        }),
      }),
      refetchOnFocus: true,
})

export const {
    useGetAllTableQuery,
    useUpdateTableMutation,
    util: { getRunningQueriesThunk },
  } = tableApi;
  
  export const { getAllTable, updateTable } = tableApi.endpoints;
