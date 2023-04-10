import { ICreateReservation, ReservationFilter } from '@/types/data-types';

import { tableApi } from './table';

// export const reservationApi = createApi({
//     reducerPath: "reservationApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl: BASE_URL,
//     }),
//     tagTypes: ['Reservation'],
//     extractRehydrationInfo(action, { reducerPath }) {
//         if (action.type === HYDRATE) {
//           return action.payload[reducerPath];
//         }
//       },
//       endpoints: (build) => ({
// getAllReservation: build.query<any, void>({
//   query: () => "/reservations",
// }),
//         createReservation: build.mutation<any, Omit<ICreateReservation, 'customerId'> & { customerId: string }>({
//           query(body) {
//             console.log(body)
//             return {
//               url: '/reservations/create',
//               method: 'POST',
//               body
//             }
//           }
//         }),
//         getReservationByFilter: build.query<any, ReservationFilter | void>({
//           providesTags: ['Reservation'],
//           query: (filter) => {
//             return {
//               url: '/reservations',
//               params: filter || {},
//             };
//           },
//         }),
//       }),

//       refetchOnFocus: true,
// })

export const reservationApi = tableApi.injectEndpoints({
  endpoints: (build) => ({
    getAllReservation: build.query<any, void>({
      query: () => '/reservations',
    }),
    createReservationService: build.mutation<
      any,
      Omit<ICreateReservation, 'customerId'> & { customerId: string }
    >({
      query: (body) => {
        console.log(body)
        return {
          url: `/reservations/create`,
          method: 'POST',
          body,
        };
      },
    }),
    getReservationByFilter: build.query<any, ReservationFilter | void>({
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
  useGetAllReservationQuery,
  useCreateReservationServiceMutation,
  useGetReservationByFilterQuery,
  util: { getRunningQueriesThunk },
} = reservationApi;

export const { getReservationByFilter } = reservationApi.endpoints;
