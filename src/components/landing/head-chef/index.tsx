import React from 'react';
import chefImg from '@/assets/images/chef.jpg';
import Image from 'next/image';
// before:w-20 before:h-full before:bg-neutral-200 before:absolute before:top-0 before:-left-20 after:w-20 after:h-full after:bg-neutral-200 after:absolute after:top-0 after:-right-20
export default function HeadChefSection() {
  return (
    <div className='relative text-slate-800 flex flex-col md:flex-row gap-24 items-center justify-center py-24 bg-neutral-200'>
      <div className="relative w-100 h-128">
        <Image
          src={chefImg}
          fill
          alt="chef-portrait"
          className="object-cover"
          // className="absolute top-0 left-0 w-full"
        />
      </div>
      <div className=' lg:max-w-[30vw] xl:max-w-2xl flex flex-col gap-6 mx-2 md:mx-0'>
        <h2 className='uppercase text-primary-orange text-xl'>Head chef</h2>
        <h2 className='uppercase text-4xl font-bold'>Carl Schmidt</h2>
        <p className='tracking-widest text-lg'>
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
