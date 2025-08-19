// src/api/users.js
import axios from "axios";
import { API_BASE_URL } from "../config/constants";

export const fetchUsers = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}/users`, { params });
  return response.data;
};

export const fetchUserById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/users/${id}`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/users`, userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
  return response.data;
};
