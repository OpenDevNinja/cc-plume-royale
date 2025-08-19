// src/hooks/useChildren.js
import { useState, useEffect } from "react";
import {
  fetchChildren,
  addChild,
  updateChild,
  getChildProgress,
} from "../api/children";

export function useChildren(parentId) {
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadChildren = async () => {
      try {
        setIsLoading(true);
        const data = await fetchChildren(parentId);
        setChildren(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setChildren([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (parentId) {
      loadChildren();
    }
  }, [parentId]);

  const createChild = async (childData) => {
    try {
      setIsLoading(true);
      const newChild = await addChild(parentId, childData);
      setChildren((prev) => [...prev, newChild]);
      return newChild;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const editChild = async (childId, childData) => {
    try {
      setIsLoading(true);
      const updatedChild = await updateChild(childId, childData);
      setChildren((prev) =>
        prev.map((child) => (child.id === childId ? updatedChild : child))
      );
      return updatedChild;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loadChildProgress = async (childId) => {
    try {
      setIsLoading(true);
      const progress = await getChildProgress(childId);
      return progress;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    children,
    isLoading,
    error,
    createChild,
    editChild,
    loadChildProgress,
  };
}
