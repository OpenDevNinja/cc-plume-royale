// src/api/children.js
import axios from "axios";
import { API_BASE_URL } from "../config/constants";

export const fetchChildren = async (parentId) => {
  const response = await axios.get(
    `${API_BASE_URL}/parents/${parentId}/children`
  );
  return response.data;
};

export const addChild = async (parentId, childData) => {
  const response = await axios.post(
    `${API_BASE_URL}/parents/${parentId}/children`,
    childData
  );
  return response.data;
};

export const updateChild = async (childId, childData) => {
  const response = await axios.put(
    `${API_BASE_URL}/children/${childId}`,
    childData
  );
  return response.data;
};

export const getChildProgress = async (childId) => {
  const response = await axios.get(
    `${API_BASE_URL}/children/${childId}/progress`
  );
  return response.data;
};
