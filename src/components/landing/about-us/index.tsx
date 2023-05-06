import React from 'react';
import Image from 'next/image';
// import styles from './styles.module.scss';
import aboutUsImg from '@/assets/images/about-us.png';
// type Props = {};

const AboutUsSection = () => {
  return (
    <section
      className="h-[1300px] bg-primary-dark flex flex-col items-center p-8 w-screen -ml-20 relative px-20"
      id="about-us">
      <h1 className="text-7xl mb-24 text-primary-yellow">About us</h1>
      <div className="flex h-full w-full relative items-center text-white">
        <p className="text-2xl leading-relaxed tracking-widest max-w-3xl">
          Le Laurie Raphaël est une plateforme pour la mise en valeur du travail
          fait par des gens de la terre, trop souvent oubliés. Praesent commodo
          cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
          lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis
          risus eget urna mollis ornare vel eu leo. Aenean lacinia bibendum
          nulla sed consectetur.
        </p>
        <div className="bg-zinc-800 relative w-full h-[900px]">
          <Image
            src={aboutUsImg}
            alt="about-us-background"
            fill
            className="object-cover absolute ml-8 -mt-8"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
