import { ICreateReservation, ReservationFilter } from '@/types/data-types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { BASE_URL } from '@/constants';

// import { tableApi } from './table';

export const reservationApi = createApi({
    reducerPath: "reservationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ['Reservation'],
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
          return action.payload[reducerPath];
        }
      },
      endpoints: (build) => ({
        getAllReservation: build.query<any, void>({
          query: () => "/reservations",
        }),
        createReservation: build.mutation<any, Omit<ICreateReservation, 'customerId'> & { customerId: string }>({
          query(body) {
            return {
              url: '/reservations/create',
              method: 'POST',
              body
            }
          }
        }),
        getReservationByFilter: build.query<any, ReservationFilter | void>({
          providesTags: ['Reservation'],
          query: (filter) => {
            return {
              url: '/reservations',
              params: filter || {},
            };
          },
        }),
      }),
      
      refetchOnFocus: true,
})

// export const reservationApi = tableApi.injectEndpoints({
//   endpoints: (build) => ({
//     getAllReservation: build.query<any, void>({
//       query: () => '/reservations',
//     }),
//     createReservation: build.mutation<any, ReservationType>({
      
//       query(body) {
//         console.log(body)
//         return {
//           url: '/reservations/create',
//           method: 'POST',
//           body,
//         };
//       }
//     }),
//   }),
// });

export const {
  useGetAllReservationQuery,
  useCreateReservationMutation,
  useGetReservationByFilterQuery,
  util: { getRunningQueriesThunk },
} = reservationApi;

export const { getAllReservation, createReservation, getReservationByFilter } = reservationApi.endpoints;
