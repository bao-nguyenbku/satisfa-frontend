import React from 'react';
import Image from 'next/image';
import Satisgi from '@/assets/images/satisgi.jpg';

type Props = {};

const MessageHeader = (props: Props) => {
  return (
    <div className="w-full h-20 bg-dark-2 flex items-center px-3">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Image
            src={Satisgi}
            className="w-12 h-12 rounded-full"
            alt="user-avatar"
          />
          <div className="w-4 h-4 bg-green-500 rounded-full border-white border-2 absolute top-0 right-0"></div>
        </div>
        <span className="text-white font-bold">Satisgi</span>
      </div>
    </div>
  );
};

export default MessageHeader;
