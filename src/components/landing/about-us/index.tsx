import React from 'react';
import Image from 'next/image';
// type Props = {};

const AboutUsSection = () => {
  return (
    <section className="relative w-full min-h-[1000px] max-w-screen-1400 mx-auto px-0 xl:px-20" id="about-us">
      <h1 className="absolute top-32 right-8 text-9xl z-10 whitespace-nowrap uppercase font-thin" data-aos='slide-left'>
        About us
      </h1>
      <Image
        src="/about-us.jpg"
        alt="about-us-background"
        width={800}
        height={700}
        quality={100}
        sizes="(max-width: 768px) 100vw"
        className="object-cover absolute top-28 2xl:left-0 2xl:translate-x-0 z-0"
        data-aos='zoom-in'
      />

      <p className="text-xl tracking-widest h-fit leading-10 absolute top-auto right-20 md:bottom-16 lg:bottom-32 bottom-0 w-fit left-10" data-aos='slide-up'>
        Le Laurie Raphaël est une plateforme pour la mise en valeur du travail
        fait par des gens de la terre, trop souvent oubliés. Praesent commodo
        cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
        lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus
        eget urna mollis ornare vel eu leo. Aenean lacinia bibendum nulla sed
        consectetur.
      </p>
      <div className="w-20 h-4 bg-slate-800 absolute bottom-32 right-0"></div>
    </section>
  );
};

export default AboutUsSection;
