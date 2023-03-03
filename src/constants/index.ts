import { Playfair_Display } from '@next/font/google';

export const playfair_display = Playfair_Display({
  subsets: ['latin'],
});

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export type TABLE_FREE = 'FREE';
export type TABLE_RESERVERD = 'RESERVERD';
export type TABLE_CHECKED_IN = 'CHECKED-IN';