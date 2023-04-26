import React from 'react';
import chefImg from '@/assets/images/chef.jpg';
import Image from 'next/image';

export default function HeadChefSection() {
  return (
    <div className='text-white flex gap-24 items-center justify-center py-24'>
      <div className="relative w-80 h-96">
        <Image
          src={chefImg}
          fill
          alt="chef-portrait"
          className="object-cover"
        />
      </div>
      <div className='max-w-2xl flex flex-col gap-6'>
        <h2 className='uppercase text-primary-yellow text-xl'>Head chef</h2>
        <h2 className='uppercase text-3xl'>Carl Schmidt</h2>
        <p className='tracking-widest'>
          Proactive, Ambitious and Creative Executive Chef with a notable career
          trajectory and achievements list. Experience in catering for up to 450
          covers at some of the most prestigious establishments in the world.
          Passionate about working with fresh produce, creating innovative
          dishes and improving restaurant ratings. An excellent communicator,
          leader and problem solver, skilled in managing and developing staff.
        </p>
      </div>
    </div>
  );
}
