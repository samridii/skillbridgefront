import axiosClient, { clearCsrfToken } from './axiosClient';

export const register = (data) => axiosClient.post('/auth/register', data);

export const login = async (data) => {
  const res = await axiosClient.post('/auth/login', data);
  clearCsrfToken(); // login regenerates the session, old csrf token is now invalid
  return res;
};

export const logout = () => axiosClient.post('/auth/logout');

export const getMe = () => axiosClient.get('/auth/me');