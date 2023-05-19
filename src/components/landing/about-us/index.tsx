import React from 'react';
import Image from 'next/image';
// type Props = {};

const AboutUsSection = () => {
  return (
    <section className="relative w-[80%] h-[1000px] max-w-[1400px] mx-auto" id="about-us">
      <h1 className="absolute top-32 right-8 text-9xl z-10 whitespace-nowrap uppercase font-thin">
        About us
      </h1>
      <Image
        src="/about-us.jpg"
        alt="about-us-background"
        width={800}
        height={700}
        quality={100}
        sizes="(max-width: 768px) 100vw"
        className="object-cover absolute top-28 left-0 z-0"
      />

      <p className="text-xl tracking-widest leading-10 absolute right-0 top-72 w-1/3">
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
