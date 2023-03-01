import { Playfair_Display } from '@next/font/google';

export const playfair_display = Playfair_Display({
  subsets: ['latin'],
});

export type TABLE_FREE = 'FREE';
export type TABLE_RESERVERD = 'RESERVERD';
export type TABLE_CHECKED_IN = 'CHECKED-IN';