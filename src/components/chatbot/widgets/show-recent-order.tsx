import React from 'react';
import * as _ from 'lodash';

type Props = {
  itemList: any;
};
const ShowRecentOrder = (props: Props) => {
  const { itemList } = props;
  return (
    <div className="flex flex-col rounded-xl gap-4">
      <span className="font-bold flex items-center justify-between">
        <span>Name</span>
        <span>Price</span>
      </span>
      {itemList &&
        _.isArray(itemList) &&
        itemList.map((item) => {
          return (
            <span
              key={item.id}
              className="font-bold flex items-center justify-between">
              <span>{item.name}</span>
              <span>{item.price}</span>
            </span>
          );
        })}
    </div>
  );
};
export default ShowRecentOrder;
