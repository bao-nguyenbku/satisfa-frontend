import React from 'react';
import Image from 'next/image';
import aboutUsImg from '@/assets/images/about-us.jpg';
// type Props = {};

const AboutUsSection = () => {
  return (
    <section
      className="about-us-section relative w-full h-auto lg:h-[900px] px-0 my-20 flex lg:flex-row flex-col"
      id="about-us">
      <div className="relative w-full lg:w-1/2 2xl:w-2/3 lg:h-full h-[500px]">
        <Image
          src={aboutUsImg}
          alt="about-us-background"
          fill
          sizes="(max-width: 768px) 100vw"
          className="object-cover"
          data-aos="slide-right"
          data-aos-anchor=".about-us-section"
          data-aos-anchor-placement="top-center"
        />
      </div>
      <aside className="flex-1 p-8 text-2xl leading-10 tracking-widest flex flex-col">
        <h1
          className="text-6xl md:text-8xl whitespace-nowrap uppercase font-thin lg:text-start text-center"
          data-aos='slide-left'
          data-aos-easing="ease-in-out">
          About us
        </h1>
        <div className="lg:m-auto w-full lg:max-w-[80%] flex flex-col gap-10 text-xl">
          <p className='indent-6' data-aos='fade-left'>
            We welcome you to sit back, unwind and appreciate the lovely sights
            and hints of the ocean while our best gourmet expert sets you up for a
            scrumptious dinner utilizing the best and freshest ingredients.
          </p>
          <p className='indent-6' data-aos='fade-left'>
            At our restaurant, we are passionate about providing a remarkable
            dining experience that goes beyond exceptional cuisine. Our team is
            dedicated to creating a welcoming atmosphere where guests can feel
            right at home
          </p>
          <p className='indent-6' data-aos='fade-left'>
            From the moment you step through our doors, you will be greeted by our
            friendly staff, who are committed to delivering attentive service with
            a genuine smile. We take pride in sourcing the finest ingredients,
            working with local suppliers to ensure freshness and quality in every
            dish we serve
          </p>
        </div>
      </aside>
      <div className="w-20 h-4 bg-slate-800 absolute bottom-32 right-0"></div>
    </section>
  );
};

export default AboutUsSection;
