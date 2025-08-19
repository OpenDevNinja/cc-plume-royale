// src/api/quizzes.js
import api from "./index";

export const fetchQuizzes = async (params = {}) => {
  const response = await api.get("/quizzes", { params });
  return response.data;
};

export const fetchQuizById = async (id) => {
  const response = await api.get(`/quizzes/${id}`);
  return response.data;
};

export const createQuiz = async (quizData) => {
  const response = await api.post("/quizzes", quizData);
  return response.data;
};

export const updateQuiz = async (id, quizData) => {
  const response = await api.put(`/quizzes/${id}`, quizData);
  return response.data;
};

export const deleteQuiz = async (id) => {
  const response = await api.delete(`/quizzes/${id}`);
  return response.data;
};

export const submitQuizResults = async (quizId, results) => {
  const response = await api.post(`/quizzes/${quizId}/results`, results);
  return response.data;
};
