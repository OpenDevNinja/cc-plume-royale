// src/data/services/subscriptionService.js
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

export const fetchSubscriptions = async () => {
  const response = await axios.get(`${API_BASE_URL}/subscriptions`);
  return response.data;
};

export const createSubscription = async (subscriptionData) => {
  const response = await axios.post(
    `${API_BASE_URL}/subscriptions`,
    subscriptionData
  );
  return response.data;
};

export const cancelSubscription = async (subscriptionId) => {
  const response = await axios.delete(
    `${API_BASE_URL}/subscriptions/${subscriptionId}`
  );
  return response.data;
};

export const getSubscriptionStats = async () => {
  const response = await axios.get(`${API_BASE_URL}/subscriptions/stats`);
  return response.data;
};

export const updateSubscriptionPlan = async (subscriptionId, newPlan) => {
  const response = await axios.patch(
    `${API_BASE_URL}/subscriptions/${subscriptionId}`,
    {
      plan: newPlan,
    }
  );
  return response.data;
};
