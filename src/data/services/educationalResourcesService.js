// src/data/services/educationalResourcesService.js
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

export const fetchResources = async (params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/educational-resources`, {
      params: {
        page: 1,
        limit: 10,
        ...params,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching resources:", error);
    throw error;
  }
};

export const fetchResourceById = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/educational-resources/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching resource ${id}:`, error);
    throw error;
  }
};

export const createResource = async (resourceData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/educational-resources`,
      resourceData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw error;
  }
};
