import React, { useRef, useEffect, useState } from 'react';

import { Table } from '@/types';

import { Popover } from '@mui/material';

import BookingCard from '../booking-card';

type Props = {
  table: Table;
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
          width: width * 1.3,
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
        <div className={`grid w-fit gap-4 min-w-[100px]`} ref={chairRef}>
          {Array.from(Array(table.numberOfSeats).keys()).map((item) => (
            <div
              key={item}
              className={`w-16 h-16 bg-stone-500 rounded-full mx-auto`}></div>
          ))}
        </div>
        <div
          className={`bg-zinc-400/30 backdrop-blur-md absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-xl border-l-[12px] border-l-stone-500 p-2`}
          ref={tableRef}>
          <h2 className="text-slate-800 text-end text-3xl normal-case">
            {table.code}
          </h2>
        </div>
      </button>
    </>
  );
};

export default TableModel;
