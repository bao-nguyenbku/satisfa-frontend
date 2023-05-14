import React from 'react';
import Image from 'next/image';
// import styles from './styles.module.scss';
import aboutUsImg from '@/assets/images/about-us.png';
// type Props = {};

const AboutUsSection = () => {
  return (
    <section
      className="h-[1300px] bg-primary-dark flex flex-col items-center md:p-8 w-screen ml-0 md:-ml-20 mt-4 relative"
      id="about-us">
      <h1 className=" text-4xl md:text-7xl mb-0 md:mb-24 text-primary-yellow">About us</h1>
      <div className="flex flex-col md:flex-row gap-8 md:gap-0 h-full w-full relative items-center text-white ">
        <p className="lg:text-xl xl:text-2xl leading-relaxed tracking-widest max-w-xs md:max-w-xl xl:max-w-3xl lg:leading-[50px]">
          Le Laurie Raphaël est une plateforme pour la mise en valeur du travail
          fait par des gens de la terre, trop souvent oubliés. Praesent commodo
          cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
          lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis
          risus eget urna mollis ornare vel eu leo. Aenean lacinia bibendum
          nulla sed consectetur.
        </p>
        <div className="bg-zinc-800 relative w-[300px] md:w-full h-[300px] md:h-[900px]">
          <Image
            src={aboutUsImg}
            alt="about-us-background"
            fill
            className="object-fill md:object-cover absolute ml-2 md:ml-8 -mt-8"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
