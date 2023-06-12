import { BASE_URL } from '@/constants';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import axios, { AxiosHeaders } from 'axios';
import { getSession } from 'next-auth/react';

export type rtkOptions = {
  headers: HeaderOptions;
};
export type HeaderOptions = {
  Authorization?: string;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers) => {
    const session = await getSession();
    const token = session?.accessToken || '';
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    (config.headers as AxiosHeaders).set(
      'Authorization',
      `Bearer ${session?.accessToken || ''}`,
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default instance;
