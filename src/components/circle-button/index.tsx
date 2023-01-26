import React from 'react';
import Image from 'next/image';
import SatisgiAvatar from '@/assets/images/satisgi.jpg';

type Props = {};

const CircleButton = (props: Props) => {
  return (
    <div className='absolute w-20 h-20 bottom-12 right-12 border-gray-600 bg-white/5 p-4 border rounded-full'>
      <div className='relative w-full h-full'>
        <Image 
          src={SatisgiAvatar}
          fill
          className='rounded-full'
          alt='bot-avatar'
        />
      </div>
    </div>
  );
};

export default CircleButton;
