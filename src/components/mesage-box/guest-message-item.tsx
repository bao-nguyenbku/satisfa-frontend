import React from 'react';
import UserAvatar from './user-avatar';
type Props = {
  message: string;
  loading: boolean;
};

const GuestMessageItem = (props: any) => {
  const { message, loading } = props;
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
