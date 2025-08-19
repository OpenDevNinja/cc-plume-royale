// 1. api/auth.js - Correction de la fonction verifyEmail
import api from "./api";

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
};

// CORRECTION: Envoyer le token dans le body
export const verifyEmail = async (token) => {
  const response = await api.post("/auth/verify-email", { token });
  return response.data;
};
