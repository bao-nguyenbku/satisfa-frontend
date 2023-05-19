import { Reservation } from '@/types';
import { formatDate } from '@/utils';
import React, { useRef, useState, useEffect } from 'react';

type Props = {
  data: Reservation;
};

export default function ReservationCard(props: Props) {
  const { data } = props;
  const chairRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [chairSize, setChairSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (tableRef.current && chairSize.width && chairSize.height) {
      tableRef.current.style.width = chairSize.width + 'px';
      tableRef.current.style.height = chairSize.height + 'px';
    }
  }, [chairSize]);
  useEffect(() => {
    if (chairRef.current && data) {
      chairRef.current.style.gridTemplateColumns = ` repeat(${
        data?.tableId?.numberOfSeats / 2
      }, minmax(0, 1fr))`;
      const width = chairRef.current?.offsetWidth;
      const height = chairRef.current?.offsetHeight;
      setChairSize((prev) => {
        return {
          ...prev,
          width: width * 1.3,
          height: height * 0.7,
        };
      });
    }
  }, [chairRef]);
  return (
    <div className="flex">
      <button className="relative cursor-pointer tracking-wide overflow-hidden w-max px-16">
        <div className={`grid w-fit gap-4`} ref={chairRef}>
          {Array.from(Array(data?.tableId?.numberOfSeats).keys()).map(
            (item) => (
              <div
                key={item}
                className={`w-20 h-20 bg-yellow-600 rounded-full`}
              />
            ),
          )}
        </div>
        <div
          className={`bg-zinc-600/30 backdrop-blur-md absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-xl border-l-[12px] p-2`}
          ref={tableRef}>
          <h2 className="text-white text-end normal-case text-2xl font-bold">
            {data.tableId?.code}
          </h2>
        </div>
      </button>
      <div className="-ml-4 border border-slate-600 p-4 flex flex-col items-start justify-center bg-zinc-800 shadow-2xl">
        <span>
          Arrive time: <strong>{formatDate(data.date)}</strong>
        </span>
        <span>
          Guests: <strong>{data.numberOfGuests}</strong>
        </span>
      </div>
    </div>
  );
}
