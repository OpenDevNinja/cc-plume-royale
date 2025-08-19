// src/stores/quizStore.js
import { create } from "zustand";

const useQuizStore = create((set) => ({
  currentQuiz: null,
  userAnswers: [],
  currentQuestionIndex: 0,
  score: 0,
  timeSpent: 0,

  startQuiz: (quiz) =>
    set({
      currentQuiz: quiz,
      userAnswers: Array(quiz.questions.length).fill(null),
      currentQuestionIndex: 0,
      score: 0,
      timeSpent: 0,
    }),

  answerQuestion: (questionIndex, answer) =>
    set((state) => {
      const newAnswers = [...state.userAnswers];
      newAnswers[questionIndex] = answer;
      return { userAnswers: newAnswers };
    }),

  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
    })),

  prevQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
    })),

  updateScore: (points) => set((state) => ({ score: state.score + points })),

  updateTime: (time) => set({ timeSpent: time }),

  resetQuiz: () =>
    set({
      currentQuiz: null,
      userAnswers: [],
      currentQuestionIndex: 0,
      score: 0,
      timeSpent: 0,
    }),
}));

export default useQuizStore;
