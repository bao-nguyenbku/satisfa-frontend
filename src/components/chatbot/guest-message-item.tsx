import React, { ReactElement } from 'react';
import Avatar from './avatar';
type Props = {
  message: string | ReactElement;
};

const GuestMessageItem = (props: Props) => {
  const { message } = props;
  return (
    <div className="flex items-end gap-2">
      <Avatar />
      <div className="bg-white rounded-xl p-2 max-w-xs">{message}</div>
    </div>
  );
};

export default GuestMessageItem;
