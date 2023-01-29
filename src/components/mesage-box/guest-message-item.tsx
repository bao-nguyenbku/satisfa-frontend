import React from 'react';
import UserAvatar from './user-avatar';
type Props = {
  message: string
};

const GuestMessageItem = (props: Props) => {
  const { message } = props;
  return (
    <div className="flex items-end gap-2">
      <UserAvatar />
      <div className="bg-white rounded-xl p-2 max-w-xs">
        {message}
      </div>
    </div>
  );
};

export default GuestMessageItem;
