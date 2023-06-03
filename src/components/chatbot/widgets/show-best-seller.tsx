import React from 'react';
import { useGetBestSellerQuery } from '@/services/order';
import * as _ from 'lodash';

const ShowBestSeller = () => {
  const { data: itemList } = useGetBestSellerQuery(5);
  return (
    <div className="flex flex-col rounded-xl gap-4">
      <span className="font-bold flex items-center justify-between">
        <span>Name</span>
        <span>Total sold</span>
      </span>
      {itemList &&
        _.isArray(itemList) &&
        itemList.map((item) => {
          return (
            <span
              key={item.id}
              className="font-bold flex items-center justify-between">
              <span>{item.name}</span>
              <span>{item.totalSold}</span>
            </span>
          );
        })}
    </div>
  );
};

export default ShowBestSeller;
