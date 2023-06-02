import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import menuBanner from '@/assets/images/menu-banner.jpg';
import Link from 'next/link';

export default function MenuBanner() {
  return (
    <section className="lg:flex justify-center items-start max-w-[90rem] mx-auto pb-0 lg:pb-48 xl:pb-60 mt-6 md:mt-52 w-full">
      <div className="lg:w-1/2 max-w-2xl mt-10">
        <div className="relative w-3/5 md:w-4/5 lg:w-11/12 z-20">
          <div
            data-aos="fade-up"
            // data-aos-anchor-placement="top-center"
            className="relative w-full pt-[75%] md:pt-[150%]">
            <Image
              src={menuBanner}
              className="absolute -top-20 md:top-0 left-0 w-full scale-125"
              data-sizes="auto"
              width={900}
              alt=""
            />
          </div>

          {/* <div className="absolute top-1/2 right-0 transform translate-x-3/4 -translate-y-1/2 z-30">
            <p
              className={
                'font-serif-bold uppercase text-4xl sm:text-6xl lg:text-8xl transform rotate-90 text-primary-orange ' +
                podkova.className
              }>
              Food
            </p>
          </div> */}
        </div>
      </div>
      <div className="bg-second lg:w-1/2 px-4 py-32 lg:px-20 xl:p-40 relative text-slate-800">
        <div className="relative z-5 md:z-30 max-w-xl mx-auto lg:max-w-none">
          <div className="space-y-4 mb-10">
            <h2
              data-aos="fade-left"
              data-aos-delay="300"
              className="font-serif-bold text-4xl sm:text-6xl text-center uppercase text-slate-800 font-thin">
              Menu
            </h2>
            <div data-aos="zoom-in-up" className="text-center text-lg xl:max-w-lg w-full">
              <p>
                Our food menus are tailored appropriately to season and
                availability. Changing daily, we use the highest quality of
                produce, cooked with care.
              </p>
            </div>
          </div>
          <div className="text-center flex">
            <Link
              href="/menu"
              className="border border-slate-800 border-solid p-6 text-lg flex items-center gap-2 w-fit mx-auto hover:bg-primary-orange hover:text-white transition-all duration-300 hover:gap-4 hover:border-primary-yellow">
              View Menus <ArrowForwardIcon />
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-full h-full w-3/4 bg-second" />
      </div>
    </section>
  );
}
