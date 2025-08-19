// src/stores/gameStore.js
import { create } from "zustand";

const useGameStore = create((set) => ({
  currentGame: null,
  gameState: {},
  scores: {},

  setCurrentGame: (game) => set({ currentGame: game }),

  updateGameState: (newState) =>
    set((state) => ({
      gameState: { ...state.gameState, ...newState },
    })),

  recordScore: (gameId, score) =>
    set((state) => ({
      scores: {
        ...state.scores,
        [gameId]: score,
      },
    })),

  resetGame: () =>
    set({
      currentGame: null,
      gameState: {},
    }),
}));

export default useGameStore;
