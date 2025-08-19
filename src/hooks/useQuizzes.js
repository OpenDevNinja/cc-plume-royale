import { useState, useEffect } from "react";
import {
  fetchQuizzes,
  fetchQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuizResults,
} from "@/api/quizzes";

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupérer tous les quiz
  const getQuizzes = async (params = {}) => {
    setIsLoading(true);
    try {
      const data = await fetchQuizzes(params);
      setQuizzes(data);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors du chargement des quiz"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Récupérer un quiz spécifique
  const getQuizById = async (id) => {
    setIsLoading(true);
    try {
      const data = await fetchQuizById(id);
      setCurrentQuiz(data);
      setError(null);
      return data;
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors du chargement du quiz"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Créer un nouveau quiz
  const addQuiz = async (quizData) => {
    setIsLoading(true);
    try {
      const newQuiz = await createQuiz(quizData);
      setQuizzes((prev) => [...prev, newQuiz]);
      setError(null);
      return newQuiz;
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors de la création du quiz"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Mettre à jour un quiz
  const editQuiz = async (id, quizData) => {
    setIsLoading(true);
    try {
      const updatedQuiz = await updateQuiz(id, quizData);
      setQuizzes((prev) =>
        prev.map((quiz) => (quiz.id === id ? updatedQuiz : quiz))
      );
      if (currentQuiz?.id === id) {
        setCurrentQuiz(updatedQuiz);
      }
      setError(null);
      return updatedQuiz;
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors de la mise à jour du quiz"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Supprimer un quiz
  const removeQuiz = async (id) => {
    setIsLoading(true);
    try {
      await deleteQuiz(id);
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
      if (currentQuiz?.id === id) {
        setCurrentQuiz(null);
      }
      setError(null);
      return true;
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors de la suppression du quiz"
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Soumettre les résultats d'un quiz
  const submitResults = async (quizId, results) => {
    setIsLoading(true);
    try {
      const response = await submitQuizResults(quizId, results);
      setError(null);
      return response;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de la soumission des résultats"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Effacer le quiz courant
  const clearCurrentQuiz = () => {
    setCurrentQuiz(null);
  };

  return {
    quizzes,
    currentQuiz,
    isLoading,
    error,
    getQuizzes,
    getQuizById,
    addQuiz,
    editQuiz,
    removeQuiz,
    submitResults,
    clearCurrentQuiz,
  };
}
