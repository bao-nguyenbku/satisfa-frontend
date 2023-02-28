import React, { useRef, useEffect, useState } from 'react';

type Props = {};

const TableModel = (props: Props) => {
  const chairRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [chairSize, setChairSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  const numOfChair = 4;

  useEffect(() => {
    if (tableRef.current && chairSize.width && chairSize.height) {
      tableRef.current.style.width = chairSize.width + 'px';
      tableRef.current.style.height = chairSize.height + 'px';
    }
  }, [chairSize]);
  useEffect(() => {
    if (chairRef.current) {
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
    <div className="relative w-fit">
      <div
        className={`grid grid-cols-${numOfChair / 2} w-fit gap-4`}
        ref={chairRef}>
        {Array.from(Array(numOfChair).keys()).map((item) => (
          <div key={item} className="bg-green-600 w-16 h-16 rounded-full"></div>
        ))}
      </div>
      <div
        className={`bg-white/20 backdrop-blur-sm absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-xl border-l-[12px] border-l-green-600 p-2`}
        ref={tableRef}>
        <h2 className="text-white text-end">T1</h2>
      </div>
    </div>
  );
};

export default TableModel;
