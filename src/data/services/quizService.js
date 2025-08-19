// src/data/services/quizService.js
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

export const fetchQuizzes = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}/quizzes`, { params });
  return response.data;
};

export const createQuiz = async (quizData) => {
  const response = await axios.post(`${API_BASE_URL}/quizzes`, quizData);
  return response.data;
};

export const updateQuiz = async (quizId, updates) => {
  const response = await axios.patch(
    `${API_BASE_URL}/quizzes/${quizId}`,
    updates
  );
  return response.data;
};

export const getQuizQuestions = async (quizId) => {
  const response = await axios.get(
    `${API_BASE_URL}/quizzes/${quizId}/questions`
  );
  return response.data;
};

export const submitQuizAnswers = async (quizId, answers) => {
  const response = await axios.post(
    `${API_BASE_URL}/quizzes/${quizId}/submit`,
    { answers }
  );
  return response.data;
};
