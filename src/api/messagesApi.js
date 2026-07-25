import axiosClient from './axiosClient';

export const getMessages = (orderId) => axiosClient.get(`/messages/${orderId}`);
export const sendMessage = (orderId, content) => axiosClient.post(`/messages/${orderId}`, { content });