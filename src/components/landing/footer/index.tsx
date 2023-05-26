// import { IconButton } from '@mui/material';
import React from 'react';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
// import Link from 'next/link';
import { podkova } from '@/constants/font';
import styles from './styles.module.scss';

export default function FooterSection() {
  return (
    <footer
      id="footer"
      className={`h-128 text-white relative justify-center flex gap-0 items-center px-10 xl:p-20 ${styles.footer}`}
    >
      <div className="flex flex-col lg:gap-2 xl:gap-4 z-10 2xl:w-full w-1/4 md:max-w-md lg:max-w-sm mr-auto xl:my-auto mt-auto">
        <h2 className="text-lg md:text-xl font-bold">Contact</h2>
        <span className="text-sm md:text-base">0123 456 789</span>
        <span className="text-sm md:text-base whitespace-pre-wrap">
          122 - 126, Satisfa Tower, Pasteur street, District 1, Ho Chi Minh City
        </span>
        <span className="text-sm md:text-base">customer@satisfa.com</span>
      </div>
      <div className="w-full absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-10">
        <h2 className={`text-6xl ${podkova.className}`}>
          Satisfa Restaurant
        </h2>
        <div className="flex items-center gap-3">
          <InstagramIcon className="text-3xl cursor-pointer" />
          <FacebookRoundedIcon className="text-3xl cursor-pointer" />
          <YouTubeIcon className="text-3xl cursor-pointer" />
        </div>
        <span className="">©2023 Satisfa</span>
      </div>
      <div className="flex flex-col gap-2 md:gap-4 z-10 ml-auto xl:my-auto mt-auto">
        <h2 className="text-xl font-bold">Hours</h2>
        <span className="text-sm md:text-base">
          Monday - Sunday <br /> 8:00am - 10:00pm
        </span>
      </div>
    </footer>
  );
}
