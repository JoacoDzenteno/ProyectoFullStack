import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let pendingRequests = [];

const processQueue = (error, newToken = null) => {
  pendingRequests.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(newToken);
    }
  });
  pendingRequests = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push({ resolve, reject });
        }).then((newToken) => {
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          return api(originalRequest);
        });
      }

      isRefreshing = true;
      try {
        const baseURL = api.defaults.baseURL || '';
        const res = await axios.post(`${baseURL}/auth/refresh`, {
          refreshToken,
        });

        const newToken = res.data.token;
        const newRefresh = res.data.refreshToken;

        if (newToken) {
          localStorage.setItem('token', newToken);
          api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        }
        if (newRefresh) {
          localStorage.setItem('refreshToken', newRefresh);
        }

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('usuario');
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;