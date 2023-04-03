import { ReservationType } from '@/types/data-types';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { HYDRATE } from 'next-redux-wrapper';
// import { BASE_URL } from '@/constants';
import { tableApi } from './table';

// export const reservationApi = createApi({
//     reducerPath: "reservationApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl: BASE_URL,
//     }),
//     tagTypes: ['Table'],
//     extractRehydrationInfo(action, { reducerPath }) {
//         if (action.type === HYDRATE) {
//           return action.payload[reducerPath];
//         }
//       },
//       endpoints: (build) => ({
//         getAllReservation: build.query<any, void>({
//           query: () => "/reservations",
//         }),
//         createReservation: build.mutation<any, ReservationType>({

//           query(body) {
//             return {
//               url: '/reservations/create',
//               method: 'POST',
//               body
//             }
//           },
//           onCacheEntryAdded: (args, { dispatch }) => {
//             dispatch(tableApi.util.invalidateTags(["Table"]))
//           }
//         }),
//       }),
//       refetchOnFocus: true,
// })

export const reservationApi = tableApi.injectEndpoints({
  endpoints: (build) => ({
    getAllReservation: build.query<any, void>({
      query: () => '/reservations',
    }),
    createReservation: build.mutation<any, ReservationType>({
      query(body) {
        return {
          url: '/reservations/create',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Table']
    }),
  }),
});

export const {
  useGetAllReservationQuery,
  useCreateReservationMutation,
  util: { getRunningQueriesThunk },
} = reservationApi;

export const { getAllReservation, createReservation } =
  reservationApi.endpoints;