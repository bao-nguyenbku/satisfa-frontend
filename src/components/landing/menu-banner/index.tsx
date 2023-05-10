import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import menuBanner from '@/assets/images/menu-banner.jpg';
import Link from 'next/link';
import { podkova } from '@/constants/font';

export default function MenuBanner() {
  return (
    <section className="lg:flex justify-center items-start max-w-[90rem] mx-auto pb-0 lg:pb-48 xl:pb-60 mt-4 md:mt-28">
      <div className="lg:w-1/2 max-w-2xl mt-10">
        <div className="relative w-3/5 md:w-4/5 lg:w-11/12 z-20">
          <div className="relative overflow-hidden w-full pt-[75%] md:pt-[150%]">
            <Image
              src={menuBanner}
              className="absolute -top-20 md:top-0 left-0 w-full"
              data-sizes="auto"
              width="700"
              alt=""
              sizes="616px"
            />
          </div>

          <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-30">
            <p className={"font-serif-bold uppercase text-4xl sm:text-6xl lg:text-8xl transform rotate-90 text-white " + podkova.className}>
              Food
            </p>
          </div>

          {/* <div className="block absolute bottom-0 left-0 transform translate-x-4 sm:translate-x-20 translate-y-1/2">
            <span className="block w-32 lg:w-40 animate-spin-reverse-slow">
              
            </span>
          </div> */}
        </div>
      </div>
      <div className="bg-zinc-800 lg:w-1/2 px-4 py-32 lg:px-20 xl:p-40 relative">
        <div className="relative z-5 md:z-30 max-w-xl mx-auto lg:max-w-none text-white">
          <div className="space-y-4 mb-10">
            <h2 className="font-serif-bold text-4xl sm:text-6xl text-center uppercase text-primary-yellow">
              Menus
            </h2>
            <div className="text-center text-lg max-w-lg">
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
              className="border border-white border-solid p-6 uppercase text-lg flex items-center gap-2 w-fit mx-auto hover:bg-primary-yellow transition-all duration-300 hover:gap-4 hover:border-primary-yellow">
              View Menus <ArrowForwardIcon />
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-full h-full w-3/4 bg-zinc-800" />
      </div>
    </section>
  );
}
