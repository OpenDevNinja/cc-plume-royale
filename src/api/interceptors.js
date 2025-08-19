// src/api/interceptors.js
import axios from "axios";
import { getAuthToken, removeAuthToken } from "../utils/auth";

axios.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      removeAuthToken();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);
