// src/api/payments.js
import api from "./index";

export const createPaymentIntent = async (amount) => {
  const response = await api.post("/payments/intent", { amount });
  return response.data;
};

export const getInvoices = async (userId) => {
  const response = await api.get(`/users/${userId}/invoices`);
  return response.data;
};

export const getPaymentMethods = async (userId) => {
  const response = await api.get(`/users/${userId}/payment-methods`);
  return response.data;
};
