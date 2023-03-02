import axios, { AxiosHeaders } from 'axios';
import { getSession } from 'next-auth/react';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": 'application/json'
  },
  timeout: 5000,
})

instance.interceptors.request.use(async (config) => {
  const session = await getSession();
  (config.headers as AxiosHeaders).set('Authorization', `Bearer ${session?.user?.userToken}`);
  return config;
}, (error) => {
  return Promise.reject(error);
})
export default instance;