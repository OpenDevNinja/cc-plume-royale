// src/api/tutoring.js
import api from "./index";

export const fetchTutors = async (params = {}) => {
  const response = await api.get("/tutors", { params });
  return response.data;
};

export const fetchTutorById = async (id) => {
  const response = await api.get(`/tutors/${id}`);
  return response.data;
};

export const bookSession = async (sessionData) => {
  const response = await api.post("/tutoring/sessions", sessionData);
  return response.data;
};

export const fetchUpcomingSessions = async (userId) => {
  const response = await api.get(`/users/${userId}/tutoring-sessions`);
  return response.data;
};

export const cancelSession = async (sessionId) => {
  const response = await api.delete(`/tutoring/sessions/${sessionId}`);
  return response.data;
};
