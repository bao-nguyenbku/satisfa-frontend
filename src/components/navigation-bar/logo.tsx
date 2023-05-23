import React from 'react';
import Link from 'next/link';
import Image from '@/components/common/image';
import { podkova } from '@/constants/font';

export default function Logo() {
  return (
    <Link
      href="/"
      className={`flex items-center text-2xl gap-2 ${podkova.className}`}>
      <Image src='/logo-2.png' width={40} height={40} alt="satisfa-logo" className="rounded-full" />
      Satisfa
    </Link>
  );
}
