import axiosClient from './axiosClient';

export const raiseDispute = (orderId, reason) => axiosClient.post('/disputes', { orderId, reason });