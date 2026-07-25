import axiosClient from './axiosClient';

export const listGigs = (category) => {
  const params = category ? { category } : {};
  return axiosClient.get('/gigs', { params });
};

export const getGig = (id) => axiosClient.get(`/gigs/${id}`);

export const createGig = (data) => axiosClient.post('/gigs', data);