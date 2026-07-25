import axiosClient from './axiosClient';

// file upload needs multipart form data, not the usual json
export const uploadVerificationDoc = (file) => {
  const formData = new FormData();
  formData.append('idDocument', file);
  return axiosClient.post('/verification/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};