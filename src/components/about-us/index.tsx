import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';

type Props = {};


const AboutUsSection = (props: Props) => {
  return (
    <div
      className="h-screen bg-primary-dark flex flex-col items-center p-8"
      id="about-us"
    >
      <h2 className="text-primary-yellow text-6xl">About us</h2>
      <div className="flex z-10 relative w-full h-full items-center">
        <article className='max-w-3xl w-1/3'>
          <h3 className="text-8xl font-passions-conflict mb-4">What is Satisfia?</h3>
          <p className="text-2xl leading-relaxed tracking-widest">
            Le Laurie Raphaël est une plateforme pour la mise en valeur du
            travail fait par des gens de la terre, trop souvent oubliés.
          </p>
        </article>
        <div className={styles.image1}>
          <Image
            src="https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=100"
            alt="image"
            fill
            className="object-cover"
            quality={100}
          />
        </div>
        <div className={styles.image2}>
          <Image
            src="https://images.unsplash.com/photo-1599458448510-59aecaea4752?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="image"
            fill
            className="object-cover"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
