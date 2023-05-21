import React from 'react';
import ReservationCard from '@/components/me/reservation-card';
import { useGetReservationByFilterQuery } from '@/services/reservation';
import Loading from '@/components/common/loading';
import SectionTitle from '@/components/section-title';

export default function MyReservations() {
  const { data, isLoading, isSuccess } = useGetReservationByFilterQuery(
    {
      currentUser: true,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  return (
    <div className="min-h-screen pt-32 flex flex-col items-center text-white max-w-[1400px] px-20 mx-auto">
      <SectionTitle title='Your reservations'/>
      <div className="flex flex-wrap gap-8 mt-20">
        {isLoading ? (
          <Loading />
        ) : (
          isSuccess &&
          data &&
          data.map((reserve) => {
            return <ReservationCard data={reserve} key={reserve.id} />;
          })
        )}
      </div>
    </div>
  );
}
