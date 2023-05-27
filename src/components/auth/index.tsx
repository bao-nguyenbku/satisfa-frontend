import React, { ReactNode } from 'react';
import Image from '@/components/common/image';

type Props = {
  children: ReactNode;
};

export default function AuthScreen(props: Props) {
  const { children } = props;
  return (
    <div className="flex h-screen w-screen relative justify-center items-center">
      <Image
        src="/login-background.jpg"
        width={1000}
        height={1000}
        alt="login-background"
        className="w-screen h-screen absolute top-0 left-0 object-cover brightness-75 blur-sm"
      />
      {children}
    </div>
  );
}
