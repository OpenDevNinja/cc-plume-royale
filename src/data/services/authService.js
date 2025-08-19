// src/data/services/authService.js
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return response.data;
};

export const requestPasswordReset = async (email) => {
  const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, {
    email,
  });
  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
    token,
    password: newPassword,
  });
  return response.data;
};

export const fetchCurrentUser = async () => {
  const response = await axios.get(`${API_BASE_URL}/auth/me`);
  return response.data;
};
