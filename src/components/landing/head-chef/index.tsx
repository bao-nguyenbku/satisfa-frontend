import React from 'react';
import chefImg from '@/assets/images/chef.jpg';
import Image from 'next/image';

export default function HeadChefSection() {
  return (
    <section className="head-chef-section relative text-slate-800 flex flex-col lg:flex-row gap-4 lg:gap-10 xl:gap-24 items-center justify-center pt-0 pb-24 md:py-24 bg-second px-0 md:px-10 mx-auto h-auto">
      <div className="relative max-w-screen-1400 lg:w-128 w-full h-full">
        <Image
          src={chefImg}
          sizes="(max-width: 768px) 100vw"
          alt="chef-portrait"
          className="object-cover"
          data-aos="zoom-in"
          data-aos-anchor=".head-chef-section"
          data-aos-delay="200"
        />
      </div>
      <div className="lg:w-1/2 w-full flex flex-col gap-6 mx-2 md:mx-0 px-4">
        <h2
          className="uppercase text-primary-orange text-3xl"
          data-aos="slide-up"
          data-aos-delay="200">
          Head chef
        </h2>
        <h2
          className="uppercase text-6xl font-bold"
          data-aos="fade-left"
          data-aos-delay="500"
          data-aos-anchor-placement="top-bottom">
          Carl Schmidt
        </h2>
        <p
          className="tracking-widest text-xl leading-8"
          data-aos="fade-left"
          data-aos-delay="500"
          data-aos-anchor-placement="top-bottom">
          Proactive, Ambitious and Creative Executive Chef with a notable career
          trajectory and achievements list. Experience in catering for up to 450
          covers at some of the most prestigious establishments in the world.
          Passionate about working with fresh produce, creating innovative
          dishes and improving restaurant ratings. An excellent communicator,
          leader and problem solver, skilled in managing and developing staff.
        </p>
      </div>
    </section>
  );
}
