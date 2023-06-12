import React from 'react';
import AvatarImg from '@/assets/images/satisgi.jpg';
import Image, { StaticImageData } from 'next/image';

type Props = {
  avatar?: string | StaticImageData;
};

const BotAvatar = (props: Props) => {
  const { avatar = AvatarImg } = props;
  return (
    <div className="w-10 h-10 rounded-full relative">
      <Image src={avatar} fill className="rounded-full" alt="user-avatar" sizes='(max-width: 768px) 100vw'/>
    </div>
  );
};

export default BotAvatar;
