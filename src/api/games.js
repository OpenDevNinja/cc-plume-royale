// src/api/games.js
import axios from "axios";
import { API_BASE_URL } from "../config/constants";

export const fetchGames = async () => {
  const response = await axios.get(`${API_BASE_URL}/games`);
  return response.data;
};

export const saveGameResult = async (gameData) => {
  const response = await axios.post(`${API_BASE_URL}/games/results`, gameData);
  return response.data;
};

export const getGameProgress = async (userId) => {
  const response = await axios.get(
    `${API_BASE_URL}/users/${userId}/game-progress`
  );
  return response.data;
};
