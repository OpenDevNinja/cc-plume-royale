// src/data/services/resourceService.js
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

export const fetchResources = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}/resources`, { params });
  return response.data;
};

export const fetchResourceById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/resources/${id}`);
  return response.data;
};

export const createResource = async (resourceData) => {
  const response = await axios.post(`${API_BASE_URL}/resources`, resourceData);
  return response.data;
};

export const updateResource = async (id, updates) => {
  const response = await axios.patch(
    `${API_BASE_URL}/resources/${id}`,
    updates
  );
  return response.data;
};

export const deleteResource = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/resources/${id}`);
  return response.data;
};
