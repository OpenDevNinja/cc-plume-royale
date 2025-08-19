// src/stores/quizStore.js
import { create } from "zustand";

const useQuizStore = create((set) => ({
  quizzes: [],
  activeQuiz: null,
  quizResults: [],
  setQuizzes: (quizzes) => set({ quizzes }),
  setActiveQuiz: (quiz) => set({ activeQuiz: quiz }),
  addQuiz: (quiz) => set((state) => ({ quizzes: [...state.quizzes, quiz] })),
  updateQuiz: (id, updates) =>
    set((state) => ({
      quizzes: state.quizzes.map((q) =>
        q.id === id ? { ...q, ...updates } : q
      ),
      activeQuiz:
        state.activeQuiz?.id === id
          ? { ...state.activeQuiz, ...updates }
          : state.activeQuiz,
    })),
  removeQuiz: (id) =>
    set((state) => ({
      quizzes: state.quizzes.filter((q) => q.id !== id),
      activeQuiz: state.activeQuiz?.id === id ? null : state.activeQuiz,
    })),
  addQuizResult: (result) =>
    set((state) => ({ quizResults: [...state.quizResults, result] })),
  clearActiveQuiz: () => set({ activeQuiz: null }),
}));

export default useQuizStore;
