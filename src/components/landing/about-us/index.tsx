import React from 'react';
import Image from 'next/image';
import aboutUsImg from '@/assets/images/about-us.jpg';
// type Props = {};

const AboutUsSection = () => {
  return (
    <section
      className="about-us-section relative w-full h-[900px] px-0 my-20 flex md:flex-row flex-col"
      id="about-us">
      <h1
        className="absolute top-0 md:-translate-x-0 md:left-auto right-auto left-1/2 -translate-x-1/2 md:right-8 text-9xl z-10 whitespace-nowrap uppercase font-thin"
        data-aos-easing="ease-in-out">
        About us
      </h1>
      <div className="mt-24 relative w-full md:w-1/2 2xl:w-2/3 h-full">
        <Image
          src={aboutUsImg}
          alt="about-us-background"
          fill
          sizes="(max-width: 768px) 100vw"
          className="object-cover"
          data-aos="zoom-out"
        />
      </div>
      <div className="flex-1 p-8 text-2xl leading-10 tracking-widest flex flex-col">
        <p className="mt-auto lg:my-auto w-full lg:max-w-[80%]">
          Le Laurie Raphaël est une plateforme pour la mise en valeur du travail
          fait par des gens de la terre, trop souvent oubliés. Praesent commodo
          cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
          lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis
          risus eget urna mollis ornare vel eu leo. Aenean lacinia bibendum
          nulla sed consectetur.
        </p>
      </div>
      <div className="w-20 h-4 bg-slate-800 absolute bottom-32 right-0"></div>
    </section>
  );
};

export default AboutUsSection;
