import axiosClient from './axiosClient';

export const setupMfa = () => axiosClient.post('/mfa/setup');
export const verifyMfaSetup = (token) => axiosClient.post('/mfa/verify-setup', { token });
export const verifyMfaLogin = (token) => axiosClient.post('/mfa/verify-login', { token });