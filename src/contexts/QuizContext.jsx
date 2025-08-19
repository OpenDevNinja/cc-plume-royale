// src/contexts/QuizContext.js
import { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    answers: [],
    timer: 0,
    isCompleted: false,
  });

  const startQuiz = (totalQuestions) => {
    setQuizState({
      currentQuestion: 0,
      answers: Array(totalQuestions).fill(null),
      timer: 0,
      isCompleted: false,
    });
  };

  const answerQuestion = (questionIndex, answer) => {
    setQuizState((prev) => {
      const newAnswers = [...prev.answers];
      newAnswers[questionIndex] = answer;

      return {
        ...prev,
        answers: newAnswers,
      };
    });
  };

  const nextQuestion = () => {
    setQuizState((prev) => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
    }));
  };

  const completeQuiz = () => {
    setQuizState((prev) => ({
      ...prev,
      isCompleted: true,
    }));
  };

  const updateTimer = (time) => {
    setQuizState((prev) => ({
      ...prev,
      timer: time,
    }));
  };

  const value = {
    ...quizState,
    startQuiz,
    answerQuestion,
    nextQuestion,
    completeQuiz,
    updateTimer,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
