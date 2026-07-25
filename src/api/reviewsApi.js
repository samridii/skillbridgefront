import axiosClient from './axiosClient';

export const createReview = (orderId, rating, comment) =>
  axiosClient.post('/reviews', { orderId, rating, comment });
export const getGigReviews = (gigId) => axiosClient.get(`/reviews/gig/${gigId}`);