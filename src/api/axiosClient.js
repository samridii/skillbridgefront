import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // sends session cookie on every request
});

let csrfToken = null;

// fetch and cache a csrf token, called before any state changing request
export const ensureCsrfToken = async () => {
  if (csrfToken) return csrfToken;
  const res = await axiosClient.get('/csrf-token');
  csrfToken = res.data.csrfToken;
  return csrfToken;
};

// clear cached token, called after login since session regenerates
export const clearCsrfToken = () => {
  csrfToken = null;
};

// attach csrf token automatically on every non get request
axiosClient.interceptors.request.use(async (config) => {
  if (config.method !== 'get') {
    const token = await ensureCsrfToken();
    config.headers['X-CSRF-Token'] = token;
  }
  return config;
});

// handle expired or invalid sessions globally
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearCsrfToken();
      // let calling code decide navigation, just clear stale state here
    }
    return Promise.reject(error);
  }
);

export default axiosClient;