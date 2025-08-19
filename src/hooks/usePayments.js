// src/hooks/usePayments.js
import { useState, useEffect } from "react";
import {
  createPaymentIntent,
  getPaymentHistory,
} from "../data/services/paymentService";

export function usePayments() {
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createNewPaymentIntent = async (amount) => {
    try {
      setIsLoading(true);
      const intent = await createPaymentIntent(amount);
      setPaymentIntent(intent);
      return intent;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPaymentHistory = async (userId) => {
    try {
      setIsLoading(true);
      const history = await getPaymentHistory(userId);
      setPaymentHistory(history);
      return history;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    paymentIntent,
    paymentHistory,
    isLoading,
    error,
    createNewPaymentIntent,
    fetchPaymentHistory,
  };
}
