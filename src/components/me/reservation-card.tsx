import React from 'react';
import { Reservation } from '@/types';
import { formatDate, transformEnumText } from '@/utils';

type Props = {
  data: Reservation;
};

const getStylesByStatus = (status: string) => {
  switch (status) {
    case 'RESERVED': {
      return {
        bg: 'bg-amber-500',
      };
    }
    case 'CHECKED_IN': {
      return {
        bg: 'bg-teal-500',
      };
    }

    default: {
      return {
        bg: 'bg-slate-800',
      };
    }
  }
};

export default function ReservationCard(props: Props) {
  const { data } = props;
  // const chairRef = useRef<HTMLDivElement>(null);
  // const tableRef = useRef<HTMLDivElement>(null);
  // const [chairSize, setChairSize] = useState<{
  //   width: number;
  //   height: number;
  // }>({
  //   width: 0,
  //   height: 0,
  // });
  // useEffect(() => {
  //   if (tableRef.current && chairSize.width && chairSize.height) {
  //     tableRef.current.style.width = chairSize.width + 'px';
  //     tableRef.current.style.height = chairSize.height + 'px';
  //   }
  // }, [chairSize]);
  // useEffect(() => {
  //   if (chairRef.current && data) {
  //     chairRef.current.style.gridTemplateColumns = ` repeat(${
  //       data?.tableId?.numberOfSeats / 2
  //     }, minmax(0, 1fr))`;
  //     const width = chairRef.current?.offsetWidth;
  //     const height = chairRef.current?.offsetHeight;
  //     setChairSize((prev) => {
  //       return {
  //         ...prev,
  //         width: width * 1.3,
  //         height: height * 0.7,
  //       };
  //     });
  //   }
  // }, [chairRef]);
  return (
    <div className="flex w-fit">
      <div
        className={`${
          getStylesByStatus(data.status).bg
        } w-20 flex flex-col items-center justify-center`}>
        <h2 className="text-white normal-case text-2xl font-bold">
          {data.tableId?.code}
        </h2>
        <span>{transformEnumText(data.status)}</span>
      </div>
      <div className="flex flex-col text-slate-800 bg-second p-4">
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
