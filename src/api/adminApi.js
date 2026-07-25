import axiosClient from './axiosClient';

export const getPendingVerifications = () => axiosClient.get('/verification/pending');
export const approveUser = (userId) => axiosClient.post(`/verification/${userId}/approve`);
export const rejectUser = (userId) => axiosClient.post(`/verification/${userId}/reject`);
export const getDisputeQueue = () => axiosClient.get('/disputes');
export const resolveDispute = (id, resolution, note) =>
  axiosClient.post(`/disputes/${id}/resolve`, { resolution, note });

// fetches the decrypted document as a blob, since it needs authenticated cookies not a plain url
export const getVerificationDoc = async (userId) => {
  const res = await axiosClient.get(`/verification/${userId}/document`, { responseType: 'blob' });
  return URL.createObjectURL(res.data);
};