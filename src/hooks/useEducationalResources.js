// src/hooks/useEducationalResources.js
import { useState, useEffect } from "react";
import {
  fetchResources,
  fetchResourceById,
} from "../data/services/educationalResourcesService";

export function useEducationalResources({ limit, page, subject, level } = {}) {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadResources = async () => {
      try {
        setIsLoading(true);
        const data = await fetchResources({ limit, page, subject, level });
        setResources(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setResources([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadResources();
  }, [limit, page, subject, level]);

  const getResourceById = async (id) => {
    try {
      setIsLoading(true);
      const resource = await fetchResourceById(id);
      return resource;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resources,
    isLoading,
    error,
    getResourceById,
  };
}
