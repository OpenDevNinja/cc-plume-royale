// src/contexts/GameContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { saveGameProgress } from "../data/services/gameService";
const GameContext = createContext();

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState({
    scores: {},
    progress: {},
    unlockedLevels: {},
  });

  useEffect(() => {
    const savedGameData = localStorage.getItem("gameProgress");
    if (savedGameData) {
      setGameState(JSON.parse(savedGameData));
    }
  }, []);

  const updateGameProgress = async (gameId, data) => {
    try {
      const updatedProgress = {
        ...gameState.progress,
        [gameId]: {
          ...gameState.progress[gameId],
          ...data,
        },
      };

      const newState = {
        ...gameState,
        progress: updatedProgress,
      };

      setGameState(newState);
      localStorage.setItem("gameProgress", JSON.stringify(newState));

      await saveGameProgress(gameId, data);
    } catch (error) {
      console.error("Failed to save game progress:", error);
    }
  };

  const unlockLevel = (gameId, level) => {
    setGameState((prev) => {
      const unlocked = prev.unlockedLevels[gameId] || [];
      const newUnlocked = [...new Set([...unlocked, level])];

      const newState = {
        ...prev,
        unlockedLevels: {
          ...prev.unlockedLevels,
          [gameId]: newUnlocked,
        },
      };

      localStorage.setItem("gameProgress", JSON.stringify(newState));
      return newState;
    });
  };

  const value = {
    ...gameState,
    updateGameProgress,
    unlockLevel,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
