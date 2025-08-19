// src/data/services/tutoringService.js
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

export const fetchTutors = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}/tutors`, { params });
  return response.data.data;
};

export const fetchTutorById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/tutors/${id}`);
  return response.data.data;
};

export const bookSession = async (sessionData) => {
  const response = await axios.post(
    `${API_BASE_URL}/tutoring/sessions`,
    sessionData
  );
  return response.data.data;
};

export const fetchUpcomingSessions = async (userId) => {
  const response = await axios.get(
    `${API_BASE_URL}/tutoring/sessions/upcoming`,
    {
      params: { userId },
    }
  );
  return response.data.data;
};

export const cancelSession = async (sessionId) => {
  const response = await axios.delete(
    `${API_BASE_URL}/tutoring/sessions/${sessionId}`
  );
  return response.data.data;
};
