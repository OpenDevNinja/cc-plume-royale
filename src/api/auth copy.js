// src/api/auth.js
import axios from "axios";
import { API_BASE_URL } from "../config/constants";

export const login = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return response.data;
};

export const logout = async () => {
  await axios.post(`${API_BASE_URL}/auth/logout`);
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${API_BASE_URL}/auth/me`);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, {
    email,
  });
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/reset-password`,
    data
  );
  return response.data;
};

//verfication d'email
export const verifyEmail = async (token) => {
  const response = await axios.post(`${API_BASE_URL}/auth/verify-email`, {
    token,
  });
  return response.data;
};  