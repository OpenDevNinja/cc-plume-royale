// src/hooks/useTutoring.js
import { useState, useEffect } from "react";
import {
  fetchTutors,
  fetchTutorById,
  bookSession,
  fetchUpcomingSessions,
  cancelSession,
} from "../data/services/tutoringService";

export function useTutoring() {
  const [tutors, setTutors] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTutors = async (params = {}) => {
    try {
      setIsLoading(true);
      const data = await fetchTutors(params);
      setTutors(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setTutors([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getTutorById = async (id) => {
    try {
      setIsLoading(true);
      const tutor = await fetchTutorById(id);
      return tutor;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createSession = async (sessionData) => {
    try {
      setIsLoading(true);
      const session = await bookSession(sessionData);
      return session;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getUpcomingSessions = async (userId) => {
    try {
      setIsLoading(true);
      const sessions = await fetchUpcomingSessions(userId);
      setUpcomingSessions(sessions);
      return sessions;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const cancelUpcomingSession = async (sessionId) => {
    try {
      setIsLoading(true);
      await cancelSession(sessionId);
      setUpcomingSessions((prev) =>
        prev.filter((session) => session.id !== sessionId)
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tutors,
    upcomingSessions,
    isLoading,
    error,
    getTutors,
    getTutorById,
    createSession,
    getUpcomingSessions,
    cancelUpcomingSession,
  };
}
