import React, { useRef, useEffect, useState } from 'react';
import {
  TABLE_CHECKED_IN,
  TABLE_FREE,
  TABLE_RESERVERD,
  playfair_display,
} from '@/constants';
import { Button, Popover } from '@mui/material';
import BookingCard from '../booking-card';

type Props = {
  code: string;
  status: TABLE_CHECKED_IN | TABLE_FREE | TABLE_RESERVERD;
  chairs: number;
};

const getStylesByStatus = (status: string) => {
  switch (status) {
    case 'CHECKED-IN': {
      return {
        bg: 'bg-red-500',
        border: 'border-l-red-500',
        title: 'Checked-in',
      };
    }
    case 'FREE': {
      return {
        bg: 'bg-green-500',
        border: 'border-l-green-500',
        title: 'Free',
      };
    }
    case 'RESERVERD': {
      return {
        bg: 'bg-yellow-500',
        border: 'border-l-yellow-500',
        title: 'Reserved',
      };
    }
    default: {
      return {
        bg: 'bg-gray-500',
        border: 'border-l-gray-500',
      };
    }
  }
};
const TableModel = (props: Props) => {
  const { code, status, chairs = 2 } = props;
  const chairRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
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
    if (chairRef.current) {
      chairRef.current.style.gridTemplateColumns = ` repeat(${
        chairs / 2
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
  }, [chairRef.current]);

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        // keepMounted
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}>
        <BookingCard />
      </Popover>

      <button className="relative w-fit cursor-pointer tracking-wide" onClick={handleClick}>
        <div className={`grid w-fit gap-4`} ref={chairRef}>
          {Array.from(Array(chairs).keys()).map((item) => (
            <div
              key={item}
              className={`${
                getStylesByStatus(status).bg
              } w-16 h-16 rounded-full`}></div>
          ))}
        </div>
        <div
          className={`bg-white/20 backdrop-blur-sm absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-xl border-l-[12px] ${
            getStylesByStatus(status).border
          } p-2`}
          ref={tableRef}>
          <h2 className="text-white text-end font-playfair normal-case">
            {code}
          </h2>
          <h1 className="text-white font-bold text-center normal-case">
            {getStylesByStatus(status).title}
          </h1>
        </div>
      </button>
    </>
  );
};

export default TableModel;