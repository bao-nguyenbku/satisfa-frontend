import React, { ReactElement } from 'react';
// import Avatar from './avatar';
import satisgiImg from '@/assets/images/satisgi.jpg';
import Image from 'next/image';
type Props = {
  message: string | ReactElement;
};

const GuestMessageItem = (props: Props) => {
  const { message } = props;
  return (
    <div className="flex items-end gap-2">
      <Image
        src={satisgiImg}
        alt="satisgi-avatar"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="bg-white rounded-xl p-2 max-w-xs">{message}</div>
    </div>
  );
};

export default GuestMessageItem;
