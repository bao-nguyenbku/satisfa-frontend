import React, { ReactNode } from 'react';
// import UserAvatar from "./user-avatar";
type Props = {
  message: ReactNode;
};

const MeMessageItem = (props: Props) => {
  const { message } = props;
  return (
    <div className="flex items-end gap-2 ml-auto">
      <div className="bg-primary-orange rounded-xl p-2 max-w-xs text-white">
        {message}
      </div>
    </div>
  );
};

export default MeMessageItem;
