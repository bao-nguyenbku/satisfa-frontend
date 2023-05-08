import {
  CreateReservation,
  Reservation,
  ReservationFilter,
} from '@/types/data-types';

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { HYDRATE } from 'next-redux-wrapper';
// import { BASE_URL } from '@/constants';
// import { baseQuery } from '@/utils/request';

import { tableApi } from './table';

export const reservationApi = tableApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getAllReservation: build.query<Reservation[], void>({
      query: () => '/reservations',
    }),
    createReservation: build.mutation<Reservation, CreateReservation>({
      // invalidatesTags: ['Reservations'],
      query(body) {
        return {
          url: '/reservations/create',
          method: 'POST',
          body,
        };
      },
    }),
    getReservationByFilter: build.query<Reservation[], ReservationFilter>({
      providesTags: ['Reservations'],
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
