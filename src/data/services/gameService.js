// src/data/services/gameService.js
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

export const fetchAllGames = async () => {
  const response = await axios.get(`${API_BASE_URL}/games`);
  return response.data;
};

export const createGame = async (gameData) => {
  const response = await axios.post(`${API_BASE_URL}/games`, gameData);
  return response.data;
};

export const updateGame = async (gameId, updates) => {
  const response = await axios.patch(
    `${API_BASE_URL}/games/${gameId}`,
    updates
  );
  return response.data;
};



export const saveGameProgress = async (gameId, progressData) => {
  const response = await axios.patch(
    `${API_BASE_URL}/games/${gameId}/progress`,
    progressData
  );
  return response.data;
};

export const getGameStatistics = async (gameId) => {
  const response = await axios.get(`${API_BASE_URL}/games/${gameId}/stats`);
  return response.data;
};
export const saveGameResult = async (resultData) => {
  const response = await axios.post(
    `${API_BASE_URL}/games/results`,
    resultData
  );
  return response.data;
};
