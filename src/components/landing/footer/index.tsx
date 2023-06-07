// import { IconButton } from '@mui/material';
import React from 'react';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
// import Link from 'next/link';
import Image from '@/components/common/image';
import { podkova } from '@/constants/font';
import footerBg from '@/assets/images/footer.jpg';

export default function FooterSection() {
  return (
    <footer
      id="footer"
      className={`min-h-[500px] h-auto bg-second text-white relative justify-center flex gap-0 items-center md:p-10 p-4 flex-col w-full`}>
      <h2
        className={`text-5xl z-10 whitespace-nowrap sm:text-6xl ${podkova.className}`}>
        Satisfa Restaurant
      </h2>
      <Image
        src={footerBg}
        alt="footer-img"
        className="absolute z-0 top-0 left-0 h-full brightness-50 w-full object-cover"
      />
      <div className="flex md:flex-row flex-col items-center gap-6 z-10 w-full relative mt-auto">
        <div className="flex flex-col gap-4">
          <span className="text-lg whitespace-nowrap">Stay Connected</span>
          <div className="flex items-center gap-3">
            <InstagramIcon className="text-4xl cursor-pointer" />
            <FacebookRoundedIcon className="text-4xl cursor-pointer" />
            <YouTubeIcon className="text-4xl cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center lg:gap-2 xl:gap-4 z-10 w-full text-xl md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2">
          <h2 className="md:text-3xl font-bold">Contact Us</h2>
          <span className="">0123 456 789</span>
          <span className="xl:w-fit md:w-1/2 w-full text-center">
            122 - 126, Satisfa Tower, Pasteur street, District 1, Ho Chi Minh
            City
          </span>
          <span className="">customer@satisfa.com</span>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2 md:gap-4 z-10 md:w-full md:ml-auto text-xl">
          <h2 className="md:text-3xl font-bold">Hours</h2>
          <span className="">Monday - Sunday</span>
          <span>8:00am - 10:00pm</span>
        </div>
      </div>
      <hr className='border border-white/20 w-full z-10 mt-auto'/>
      <span className="mt-4 z-10">©2023 Satisfa</span>
    </footer>
  );
}
