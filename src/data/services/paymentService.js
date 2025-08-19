// src/data/services/paymentService.js
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

export const createPaymentMethod = async (paymentMethodData) => {
  const response = await axios.post(
    `${API_BASE_URL}/payments/methods`,
    paymentMethodData
  );
  return response.data;
};

export const getPaymentMethods = async (userId) => {
  const response = await axios.get(
    `${API_BASE_URL}/payments/methods/${userId}`
  );
  return response.data;
};

export const deletePaymentMethod = async (methodId) => {
  const response = await axios.delete(
    `${API_BASE_URL}/payments/methods/${methodId}`
  );
  return response.data;
};

export const getBillingHistory = async (userId) => {
  const response = await axios.get(
    `${API_BASE_URL}/payments/history/${userId}`
  );
  return response.data;
};

export const downloadInvoice = async (invoiceId) => {
  const response = await axios.get(
    `${API_BASE_URL}/payments/invoices/${invoiceId}`,
    {
      responseType: "blob",
    }
  );
  return response.data;
};

export const getPaymentSettings = async () => {
  const response = await axios.get(`${API_BASE_URL}/payments/settings`);
  return response.data;
};

export const updatePaymentSettings = async (settingsData) => {
  const response = await axios.put(`${API_BASE_URL}/payments/settings`, settingsData);
  return response.data;
};