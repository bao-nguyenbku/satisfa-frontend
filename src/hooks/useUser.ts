import axios from '../utils/request';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const useUser = () => {
  const response = useSWR('http://localhost:5000/auth/me', fetcher);
  return { ...response };
};

export default useUser;
