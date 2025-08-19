import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

export const getTutorSessions = async (tutorId) => {
  const response = await axios.get(
    `${API_BASE_URL}/tutors/${tutorId}/sessions`
  );
  return response.data;
};

export const bookSession = async (sessionData) => {
  const response = await axios.post(
    `${API_BASE_URL}/tutoring/sessions`,
    sessionData
  );
  return response.data;
};

export const cancelSession = async (sessionId) => {
  await axios.delete(`${API_BASE_URL}/tutoring/sessions/${sessionId}`);
};

export const getUpcomingSessions = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/tutoring/sessions/upcoming`
  );
  return response.data;
};

export const getPastSessions = async () => {
  const response = await axios.get(`${API_BASE_URL}/tutoring/sessions/past`);
  return response.data;
};

export const rateSession = async (sessionId, rating) => {
  const response = await axios.post(
    `${API_BASE_URL}/tutoring/sessions/${sessionId}/rate`,
    Rating
  );
  return response.data;
};
