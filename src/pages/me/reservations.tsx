import React, { useEffect } from 'react';
import ReservationCard from '@/components/me/reservation-card';
import dayjs from 'dayjs';
import {
  reservationApi,
  getRunningQueriesThunk,
  useGetReservationByFilterQuery,
  useUpdateReservationMutation,
} from '@/services/reservation';
import Loading from '@/components/common/loading';
import SectionTitle from '@/components/section-title';
import { wrapper } from '@/store';
import { Reservation, ReservationStatus } from '@/types';

const sortReservationByDate = (data: Reservation[], type?: 'asc' | 'des') => {
  const cloneData = data.slice();
  const returnValue = type === 'asc' || !type ? -1 : 1;
  cloneData.sort((prev, curr) => {
    if (dayjs(prev.date).isBefore(curr.date)) {
      return returnValue;
    }
    return -1 * returnValue;
  });
  return cloneData;
};
export default function MyReservations() {
  const { data, isLoading, isSuccess, refetch } =
    useGetReservationByFilterQuery(
      {
        currentUser: true,
      },
      {
        refetchOnMountOrArgChange: true,
      },
    );
  const [updateReservation, updateReservationRes] =
    useUpdateReservationMutation();
  const handleCancel = (data: Reservation) => {
    const isConfirm = true;
    if (isConfirm) {
      updateReservation({
        id: data.id,
        status: ReservationStatus.CANCELED,
      });
    }
  };
  useEffect(() => {
    const { isLoading, isSuccess, data } = updateReservationRes;
    if (!isLoading && isSuccess && data) {
      refetch();
    }
  }, [updateReservationRes]);

  return (
    <div className="min-h-screen py-32 flex flex-col items-center text-white max-w-[1400px] px-20 mx-auto">
      <SectionTitle title="Your reservations" />
      <div className="flex flex-wrap gap-8 mt-20">
        {isLoading ? (
          <Loading />
        ) : (
          isSuccess &&
          data &&
          sortReservationByDate(data, 'des').map((reserve) => {
            return (
              <ReservationCard
                data={reserve}
                key={reserve.id}
                onCancel={handleCancel}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(
      reservationApi.endpoints.getReservationByFilter.initiate({
        currentUser: true,
      }),
    );
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {},
    };
  },
);
