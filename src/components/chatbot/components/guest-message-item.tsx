import React, { ReactNode } from 'react';
// import Avatar from './avatar';
import BotAvatar from '../../common/bot-avatar/avatar';
type Props = {
  message: ReactNode;
};

const GuestMessageItem = (props: Props) => {
  const { message } = props;
  return (
    <div className="flex items-end gap-2 text-inherit">
      <BotAvatar />
      <div className="bg-neutral-100 rounded-xl p-2 max-w-[16rem]">{message}</div>
    </div>
  );
};

export default GuestMessageItem;
