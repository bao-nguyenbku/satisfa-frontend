import React, { useRef, useEffect, useState } from 'react';

import { TableStatus } from '@/types/data-types';

import { Popover } from '@mui/material';

import BookingCard from '../booking-card';

type TableProps = {
  code: string;
  status: TableStatus;
  numberOfSeats: number;
  id: string;
  _id: string;
};

type Props = {
  table: TableProps;
};

const getStylesByStatus = (status: string) => {
  switch (status) {
    case TableStatus.CHECKED_IN: {
      return {
        bg: 'bg-red-500',
        border: 'border-l-red-500',
        title: 'Checked-in',
      };
    }
    case TableStatus.FREE: {
      return {
        bg: 'bg-green-500',
        border: 'border-l-green-500',
        title: 'Free',
      };
    }
    case TableStatus.RESERVED: {
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
  const { table } = props;
  const chairRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
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
        table.numberOfSeats / 2
      }, minmax(0, 1fr))`;
      const width = chairRef.current?.offsetWidth;
      const height = chairRef.current?.offsetHeight;
      setChairSize((prev) => {
        return {
          ...prev,
          width: width * 1.1,
          height: height * 0.7,
        };
      });
    }
  }, [chairRef]);

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
        <BookingCard table={table} />
      </Popover>

      <button
        className="relative cursor-pointer tracking-wide overflow-hidden w-max px-10"
        onClick={handleClick}>
        <div className={`grid w-fit gap-4`} ref={chairRef}>
          {Array.from(Array(table.numberOfSeats).keys()).map((item) => (
            <div
              key={item}
              className={`${
                getStylesByStatus(table.status).bg
              } w-16 h-16 rounded-full`}></div>
          ))}
        </div>
        <div
          className={`bg-white/20 backdrop-blur-sm absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-xl border-l-[12px] ${
            getStylesByStatus(table.status).border
          } p-2`}
          ref={tableRef}>
          <h2 className="text-white text-end font-playfair normal-case">
            {table.code}
          </h2>
          <h1 className="text-white font-bold text-center normal-case">
            {getStylesByStatus(table.status).title}
          </h1>
        </div>
      </button>
    </>
  );
};

export default TableModel;
