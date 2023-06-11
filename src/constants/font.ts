// import localFont from '@next/font/local';
import { Nunito, Podkova } from '@next/font/google';

// export const podkova = localFont({
//   src: [
//     {
//       path: '../assets/fonts/Podkova-Bold.ttf',
//       weight: '700',
//       style: 'normal',
//     },
//     {
//       path: '../assets/fonts/Podkova-ExtraBold.ttf',
//       weight: '800',
//       style: 'normal',
//     },
//     {
//       path: '../assets/fonts/Podkova-Medium.ttf',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: '../assets/fonts/Podkova-Regular.ttf',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../assets/fonts/Podkova-SemiBold.ttf',
//       weight: '600',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-podkova',
//   display: 'swap',
//   preload: true,
// });
// export const playfair_display = Playfair_Display({
//   subsets: ['latin'],
// });
// export const nunito = localFont({
//   src: [
//     {
//       path: '../assets/fonts/Nunito-ExtraLight.ttf',
//       weight: '200',
//       style: 'normal',
//     },
//     {
//       path: '../assets/fonts/Nunito-ExtraLightItalic.ttf',
//       weight: '200',
//       style: 'italic',
//     },
//     {
//       path: '../assets/fonts/Nunito-Light.ttf',
//       weight: '300',
//       style: 'normal',
//     },
//     {
//       path: '../assets/fonts/Nunito-LightItalic.ttf',
//       weight: '300',
//       style: 'italic',
//     },
//     {
//       path: '../assets/fonts/Nunito-Regular.ttf',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../assets/fonts/Nunito-Medium.ttf',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: '../assets/fonts/Nunito-MediumItalic.ttf',
//       weight: '500',
//       style: 'italic',
//     },
//     {
//       path: '../assets/fonts/Nunito-SemiBold.ttf',
//       weight: '600',
//       style: 'normal',
//     },
//     {
//       path: '../assets/fonts/Nunito-SemiBoldItalic.ttf',
//       weight: '600',
//       style: 'italic',
//     },
//     {
//       path: '../assets/fonts/Nunito-Bold.ttf',
//       weight: '700',
//       style: 'normal',
//     },
//     {
//       path: '../assets/fonts/Nunito-BoldItalic.ttf',
//       weight: '700',
//       style: 'italic',
//     },
//     {
//       path: '../assets/fonts/Nunito-ExtraBold.ttf',
//       weight: '800',
//       style: 'normal',
//     },
//     {
//       path: '../assets/fonts/Nunito-ExtraBoldItalic.ttf',
//       weight: '800',
//       style: 'italic',
//     },
//     {
//       path: '../assets/fonts/Nunito-Black.ttf',
//       weight: '900',
//       style: 'normal',
//     },
//     {
//       path: '../assets/fonts/Nunito-BlackItalic.ttf',
//       weight: '900',
//       style: 'italic',
//     },
//   ],
//   preload: true,
//   display: 'swap',
// });
export const podkova = Podkova({
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});
export const nunito = Nunito({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});
