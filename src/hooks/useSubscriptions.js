// src/hooks/useSubscriptions.js
import { useState, useEffect } from "react";
import {
  fetchSubscriptions,
  createSubscription,
  cancelSubscription,
  updateSubscription,
  getSubscriptionStats,
} from "../api/subscriptions";

export function useSubscriptions(userId) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSubscriptions(userId);
        setSubscriptions(data);
        setCurrentSubscription(data.find((sub) => sub.status === "active"));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      loadSubscriptions();
    }
  }, [userId]);

  const subscribe = async (planData) => {
    try {
      setIsLoading(true);
      const newSubscription = await createSubscription({
        ...planData,
        userId,
      });
      setCurrentSubscription(newSubscription);
      setSubscriptions((prev) => [...prev, newSubscription]);
      return newSubscription;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const cancel = async (subscriptionId) => {
    try {
      setIsLoading(true);
      await cancelSubscription(subscriptionId);
      setCurrentSubscription(null);
      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.id === subscriptionId ? { ...sub, status: "canceled" } : sub
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (subscriptionId, updates) => {
    try {
      setIsLoading(true);
      const updated = await updateSubscription(subscriptionId, updates);
      setSubscriptions((prev) =>
        prev.map((sub) => (sub.id === subscriptionId ? updated : sub))
      );
      if (updated.status === "active") {
        setCurrentSubscription(updated);
      }
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      setIsLoading(true);
      const statsData = await getSubscriptionStats();
      setStats(statsData);
      return statsData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subscriptions,
    currentSubscription,
    stats,
    isLoading,
    error,
    subscribe,
    cancel,
    update,
    loadStats,
  };
}
