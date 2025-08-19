// src/data/services/childService.js
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

export const fetchChildProfile = async (childId) => {
  const response = await axios.get(`${API_BASE_URL}/children/${childId}`);
  return response.data;
};

export const updateChildProfile = async (childId, updates) => {
  const response = await axios.patch(
    `${API_BASE_URL}/children/${childId}`,
    updates
  );
  return response.data;
};

export const getChildProgress = async (childId) => {
  const response = await axios.get(
    `${API_BASE_URL}/children/${childId}/progress`
  );
  return response.data;
};

export const addChildToParent = async (parentId, childData) => {
  const response = await axios.post(
    `${API_BASE_URL}/parents/${parentId}/children`,
    childData
  );
  return response.data;
};
