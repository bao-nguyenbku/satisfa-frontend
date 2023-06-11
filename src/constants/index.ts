import { nunito } from './font';
export const HEAD_TITLE = 'Satisfa Restaurant';
export const primaryFont = nunito;
export const DEV_MODE = process.env.NODE_ENV === 'development';

export const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
export const CART_COOKIE_KEY = 'my-cart';