import localFont from '@next/font/local';
import { Playfair_Display, Nunito, Pacifico } from '@next/font/google';

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
export const nunito = Nunito({
  subsets: ['latin'],
});

export const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400'
});
