// src/api/educationalResources.js
import axios from "axios";
import { API_BASE_URL } from "../config/constants";

export const fetchResources = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}/educational-resources`, {
    params,
  });
  return response.data;
};

export const fetchResourceById = async (id) => {
  const response = await axios.get(
    `${API_BASE_URL}/educational-resources/${id}`
  );
  return response.data;
};

export const createResource = async (resourceData) => {
  const response = await axios.post(
    `${API_BASE_URL}/educational-resources`,
    resourceData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const updateResource = async (id, resourceData) => {
  const response = await axios.put(
    `${API_BASE_URL}/educational-resources/${id}`,
    resourceData
  );
  return response.data;
};

export const deleteResource = async (id) => {
  const response = await axios.delete(
    `${API_BASE_URL}/educational-resources/${id}`
  );
  return response.data;
};
