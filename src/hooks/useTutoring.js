// src/hooks/useTutoring.js
import { useState, useEffect } from "react";
import {
  fetchTutors,
  fetchTutorById,
  bookSession,
  fetchUpcomingSessions,
  cancelSession,
} from "../api/tutoring";

export function useTutoring(userId) {
  const [tutors, setTutors] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTutors = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTutors();
        setTutors(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setTutors([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTutors();
  }, []);

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

  const bookTutoringSession = async (sessionData) => {
    try {
      setIsLoading(true);
      const newSession = await bookSession(sessionData);
      setUpcomingSessions((prev) => [...prev, newSession]);
      return newSession;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loadUpcomingSessions = async () => {
    try {
      setIsLoading(true);
      const sessions = await fetchUpcomingSessions(userId);
      setUpcomingSessions(sessions);
      return sessions;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelTutoringSession = async (sessionId) => {
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
    getTutorById,
    bookTutoringSession,
    loadUpcomingSessions,
    cancelTutoringSession,
  };
}
