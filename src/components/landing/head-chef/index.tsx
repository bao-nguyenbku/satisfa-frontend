import React from 'react';
import chefImg from '@/assets/images/chef.jpg';
import Image from 'next/image';

export default function HeadChefSection() {
  return (
    <div className='relative text-white flex gap-24 items-center justify-center py-24 bg-zinc-800 before:w-20 before:h-full before:bg-zinc-800 before:absolute before:top-0 before:-left-20 after:w-20 after:h-full after:bg-zinc-800 after:absolute after:top-0 after:-right-20'>
      <div className="relative w-100 h-128">
        <Image
          src={chefImg}
          fill
          alt="chef-portrait"
          className="object-cover"
          // className="absolute top-0 left-0 w-full"
        />
      </div>
      <div className='xl:max-w-2xl lg:max-w-[30vw]  flex flex-col gap-6'>
        <h2 className='uppercase text-primary-yellow text-xl'>Head chef</h2>
        <h2 className='uppercase text-3xl font-bold'>Carl Schmidt</h2>
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
