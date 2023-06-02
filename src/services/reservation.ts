import { CreateReservation, Reservation, ReservationFilter } from '@/types';

import { createApi } from '@reduxjs/toolkit/query/react';
// import { HYDRATE } from 'next-redux-wrapper';
// import { BASE_URL } from '@/constants';
import { baseQuery } from '@/utils/request';

export const reservationApi = createApi({
  reducerPath: 'reservationApi',
  baseQuery,
  tagTypes: ['reservation'],
  endpoints: (build) => ({
    getAllReservation: build.query<Reservation[], void>({
      providesTags: ['reservation'],
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
      providesTags: ['reservation'],
      query: (filter) => {
        return {
          url: '/reservations',
          params: filter || {},
        };
      },
    }),
    updateReservation: build.mutation<Reservation, any>({
      invalidatesTags: ['reservation'],
      query: (updateData) => {
        return {
          url: `/reservations/${updateData.id}`,
          body: updateData,
          method: 'PATCH',
        };
      },
    }),
  }),
});

export const {
  useCreateReservationMutation,
  useGetAllReservationQuery,
  useGetReservationByFilterQuery,
  useUpdateReservationMutation,
  util: { getRunningQueriesThunk },
} = reservationApi;

export const { getAllReservation, createReservation, getReservationByFilter } =
  reservationApi.endpoints;
