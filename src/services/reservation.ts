import { CreateReservation, Reservation, ReservationFilter } from '@/types';

import { createApi } from '@reduxjs/toolkit/query/react';
// import { HYDRATE } from 'next-redux-wrapper';
// import { BASE_URL } from '@/constants';
import { baseQuery } from '@/utils/request';

export const reservationApi = createApi({
  reducerPath: 'reservationApi',
  baseQuery,
  endpoints: (build) => ({
    getAllReservation: build.query<Reservation[], void>({
      query: () => '/reservations',
    }),
    createReservation: build.mutation<Reservation, CreateReservation>({
      query(body) {
        return {
          url: '/reservations/create',
          method: 'POST',
          body,
        };
      },
    }),
    getReservationByFilter: build.query<Reservation[], ReservationFilter>({
      query: (filter) => {
        return {
          url: '/reservations',
          params: filter || {},
        };
      },
    }),
  }),
});

export const {
  useCreateReservationMutation,
  useGetAllReservationQuery,
  useGetReservationByFilterQuery,
  util: { getRunningQueriesThunk },
} = reservationApi;

export const { getAllReservation, createReservation, getReservationByFilter } =
  reservationApi.endpoints;
