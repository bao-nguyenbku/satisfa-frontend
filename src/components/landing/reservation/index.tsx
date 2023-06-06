import React from 'react';
// import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import banner6 from '@/assets/images/banner-6.jpg';

export default function ReservationSection() {
  // const containerRef = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  // });
  // const y = useTransform(scrollYProgress, [0, 1], [-400, 400]);
  return (
    <div className="relative eat-together">
      <div className="relative w-screen h-screen z-0">
        <Image
          src={banner6}
          alt="reserve-background"
          fill
          className="-z-30 brightness-90 object-cover"
        />
      </div>
      <div className="z-10 absolute top-1/2 -translate-y-1/2 left-0 text-white w-full h-full flex flex-col items-center justify-center gap-6 md:px-20 px-4">
        <h1
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-anchor=".eat-together"
          className="text-5xl xs:text-6xl md:text-7xl font-bold text-white uppercase">
          Eat Together
        </h1>
        <p
          className="text-xl p-2 md:p-0"
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-anchor=".eat-together"
          data-aos-delay={300}>
          Every plate achieves that elusive, cuisine-defining balance of sweet,
          salty, and sour — even dessert.
        </p>
        <Link className="uppercase border border-white p-6 hover:bg-white hover:text-slate-800 transition-all duration-500" href="/reservation">
          Make a Reservation
        </Link>
      </div>
    </div>
  );
}
