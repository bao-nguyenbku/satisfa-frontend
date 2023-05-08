import React from 'react';
import ReservationCard from '@/components/me/reservation-card';
import { useGetReservationByFilterQuery } from '@/services/reservation';
import Loading from '@/components/common/loading';

export default function MyReservations() {
  const { data, isLoading, isSuccess } = useGetReservationByFilterQuery({
    currentUser: true,
  });
  return (
    <div className="min-h-screen pt-32 text-white">
      <h1 className="text-7xl mb-24 text-primary-yellow text-center">
        Your reservations
      </h1>
      <div className="flex flex-wrap gap-4">
        {isLoading ? (
          <Loading />
        ) : (
          isSuccess &&
          data &&
          data
            // .sort(
            //   (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            // )
            .map((reserve) => {
              return <ReservationCard data={reserve} key={reserve.id} />;
            })
        )}
      </div>
    </div>
  );
}
