import { Playfair_Display } from '@next/font/google';
export const DEV_MODE = process.env.NODE_ENV === 'development';
import localFont from '@next/font/local';

export const podkova = localFont({
  src: [
    {
      path: '../assets/fonts/Podkova-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Podkova-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Podkova-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Podkova-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Podkova-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-podkova',
  display: 'swap',
});
export const playfair_display = Playfair_Display({
  subsets: ['latin'],
});

export const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
