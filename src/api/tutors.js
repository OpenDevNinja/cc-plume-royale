import axios from "axios";
import { API_BASE_URL } from "../config/constants";

export const getTutors = async () => {
  const response = await axios.get(`${API_BASE_URL}/admin/tutors`);
  return response.data;
};

export const getTutorById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/admin/tutors/${id}`);
  return response.data;
};

export const approveTutor = async (id) => {
  const response = await axios.put(
    `${API_BASE_URL}/admin/tutors/${id}/approve`
  );
  return response.data;
};

export const rejectTutor = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/admin/tutors/${id}`);
  return response.data;
};

export const createTutor = async (tutorData) => {
  const response = await axios.post(`${API_BASE_URL}/admin/tutors`, tutorData);
  return response.data;
};

export const updateTutor = async (id, tutorData) => {
  const response = await axios.put(
    `${API_BASE_URL}/admin/tutors/${id}`,
    tutorData
  );
  return response.data;
};
