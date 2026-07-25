import axiosClient from './axiosClient';

export const createOrder = (gigId) => axiosClient.post('/orders', { gigId });
export const getOrder = (id) => axiosClient.get(`/orders/${id}`);
export const confirmOrder = (id) => axiosClient.post(`/orders/${id}/confirm`);