// src/api/subscriptions.js
import api from "./index";

export const fetchSubscriptions = async (userId) => {
  const response = await api.get(`/users/${userId}/subscriptions`);
  return response.data;
};

export const createSubscription = async (subscriptionData) => {
  const response = await api.post("/subscriptions", subscriptionData);
  return response.data;
};

export const cancelSubscription = async (subscriptionId) => {
  const response = await api.delete(`/subscriptions/${subscriptionId}`);
  return response.data;
};

export const updateSubscription = async (subscriptionId, updates) => {
  const response = await api.patch(`/subscriptions/${subscriptionId}`, updates);
  return response.data;
};

export const getSubscriptionStats = async () => {
  const response = await api.get("/subscriptions/stats");
  return response.data;
};
