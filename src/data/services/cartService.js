// src/data/services/cartService.js
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

export const syncCartWithServer = async (userId, cartItems) => {
  const response = await axios.post(`${API_BASE_URL}/carts/sync`, {
    userId,
    items: cartItems,
  });
  return response.data;
};

export const getCartFromServer = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/carts/${userId}`);
  return response.data;
};

export const clearServerCart = async (userId) => {
  const response = await axios.delete(`${API_BASE_URL}/carts/${userId}`);
  return response.data;
};
