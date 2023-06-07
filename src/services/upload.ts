import axios from '@/utils/request';

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios
    .post('/uploads', formData)
    .then((response) => response.data)
    .catch((error) => {
      return error && error.data;
    });
};
