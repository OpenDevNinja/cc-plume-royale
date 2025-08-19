// src/hooks/useGames.js
import { useState, useEffect } from "react";
import { fetchAllGames, saveGameResult } from "../data/services/gameService";

export function useGames() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchAllGames();
        setGames(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, []);

  const saveResult = async (gameId, score, timeSpent) => {
    try {
      await saveGameResult({
        gameId,
        score,
        timeSpent,
        completedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Failed to save game result:", err);
      throw err;
    }
  };

  return {
    games,
    isLoading,
    error,
    saveResult,
  };
}
