import { IconButton } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from 'next/link';
import bgImage from '@/assets/images/contact-background.jpg';
// type Props = {};

const FooterSection = () => {
  return (
    <div className="h-screen w-screen relative -left-20 top-0" id="footer">
      <Image
        className="object-cover absolute top-0 left-0 brightness-50 z-10"
        src={bgImage}
        alt="contact"
        fill
      />
      <div className="z-10 flex flex-col absolute h-full w-full p-4">
        <div className="flex flex-col text-white items-center top-1/2 -translate-y-1/2 absolute left-1/2 -translate-x-1/2">
          <span className="font-passions-conflict text-8xl text-primary-yellow">
            Questions
          </span>
          <span className="text-8xl">Get in touch</span>
        </div>
        <div className="mt-auto flex flex-col gap-6">
          <div className="flex items-center mx-auto gap-6">
            <IconButton className="bg-white/20 border border-slate-600 border-solid p-4">
              <FacebookRoundedIcon className="text-white" />
            </IconButton>
            <IconButton className="bg-white/20 border border-slate-600 border-solid p-4">
              <YouTubeIcon className="text-white" />
            </IconButton>
            <IconButton className="bg-white/20 border border-slate-600 border-solid p-4">
              <InstagramIcon className="text-white" />
            </IconButton>
          </div>

          <div className="flex flex-col max-w-max mx-auto gap-6">
            <div className="flex w-full text-white gap-8 text-2xl justify-between whitespace-nowrap">
              <Link href="/">Home</Link>
              <Link href="/menu">Our menu</Link>
              <Link href="#about-us">About us</Link>
              <Link href="#contact">Contact</Link>
            </div>
            <hr className="border-solid border-2 border-slate-500/50 w-full" />
          </div>
          <span className="text-white text-xl mx-auto">©2023 Satisfa</span>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
