import {
  CreateReservation,
  Reservation,
  ReservationFilter,
} from '@/types/data-types';
import { tableApi } from './table';

export const reservationApi = tableApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getAllReservation: build.query<Reservation[], void>({
      query: () => '/reservations',
    }),
    createReservation: build.mutation<
      Reservation,
      Omit<CreateReservation, 'customerId'> & { customerId: string }
    >({
      query(body) {
        return {
          url: '/reservations/create',
          method: 'POST',
          body,
        };
      },
    }),
    getReservationByFilter: build.query<
      Reservation[],
      ReservationFilter | void
    >({
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
