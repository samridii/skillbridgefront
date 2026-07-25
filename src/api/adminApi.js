import axiosClient from './axiosClient';

export const getPendingVerifications = () => axiosClient.get('/verification/pending');
export const approveUser = (userId) => axiosClient.post(`/verification/${userId}/approve`);
export const rejectUser = (userId) => axiosClient.post(`/verification/${userId}/reject`);
export const getDisputeQueue = () => axiosClient.get('/disputes');
export const resolveDispute = (id, resolution, note) =>
  axiosClient.post(`/disputes/${id}/resolve`, { resolution, note });