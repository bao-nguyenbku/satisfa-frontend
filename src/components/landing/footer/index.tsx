// import { IconButton } from '@mui/material';
import React from 'react';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
// import Link from 'next/link';
import { podkova } from '@/constants/font';
import styles from './styles.module.scss';
// import bgImage from '@/assets/images/contact-background.jpg';
// type Props = {};

// export default function FooterSection () {
//   return (
//     <div className="h-screen w-screen relative -left-20 top-0" id="footer">
//       <Image
//         className="object-cover absolute top-0 left-0 brightness-50 z-10"
//         src={bgImage}
//         alt="contact"
//         fill
//       />
//       <div className="z-10 flex flex-col absolute h-full w-full p-4">
//         <div className="flex flex-col text-white items-center top-1/2 -translate-y-1/2 absolute left-1/2 -translate-x-1/2">
//           <span className="font-passions-conflict text-8xl text-primary-yellow">
//             Questions
//           </span>
//           <span className="text-8xl">Get in touch</span>
//         </div>
//         <div className="mt-auto flex flex-col gap-6">
//           <div className="flex items-center mx-auto gap-6">
//             <IconButton className="bg-white/20 border border-slate-600 border-solid p-4">
//               <FacebookRoundedIcon className="text-white" />
//             </IconButton>
//             <IconButton className="bg-white/20 border border-slate-600 border-solid p-4">
//               <YouTubeIcon className="text-white" />
//             </IconButton>
//             <IconButton className="bg-white/20 border border-slate-600 border-solid p-4">
//               <InstagramIcon className="text-white" />
//             </IconButton>
//           </div>

//           <div className="flex flex-col max-w-max mx-auto gap-6">
//             <div className="flex w-full text-white gap-8 text-2xl justify-between whitespace-nowrap">
//               <Link href="/">Home</Link>
//               <Link href="/menu">Our menu</Link>
//               <Link href="#about-us">About us</Link>
//               <Link href="#contact">Contact</Link>
//             </div>
//             <hr className="border-solid border-2 border-slate-500/50 w-full" />
//           </div>
//           <span className="text-white text-xl mx-auto">©2023 Satisfa</span>
//         </div>
//       </div>
//     </div>
//   );
// };

export default function FooterSection() {
  return (
    <footer id={styles.footer}>
      <div className="flex flex-col lg:gap-2 xl:gap-4 z-10 xl:max-w-md lg:max-w-sm">
        <h2 className='text-xl font-bold'>Contact</h2>
        <span>0123 456 789</span>
        <span>122 - 126, Satisfa Tower, Pasteur street, District 1, Ho Chi Minh City</span>
        <span>customer@satisfa.com</span>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 flex flex-col items-center gap-6 z-10">
        <h2 className={`text-6xl ${podkova.className}`}>Satisfa Restaurant</h2>
        <div className="flex items-center gap-3">
          <InstagramIcon className="text-3xl" />
          <FacebookRoundedIcon className="text-3xl" />
          <YouTubeIcon className="text-3xl" />
        </div>
        <span className="mt-44">©2023 Satisfa</span>
      </div>
      <div className="flex flex-col gap-4 z-10">
        <h2 className='text-xl font-bold'>Hours</h2>
        <span>Monday - Sunday <br /> 8:00am - 22:00pm</span>
      </div>
    </footer>
  );
}
