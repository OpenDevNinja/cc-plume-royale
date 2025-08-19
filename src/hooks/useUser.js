// src/hooks/useUsers.js
import { useState, useEffect } from "react";
import {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../api/users";

export function useUsers(params = {}) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUsers(params);
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [params]);

  const getUserById = async (id) => {
    try {
      setIsLoading(true);
      const user = await fetchUserById(id);
      return user;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const addUser = async (userData) => {
    try {
      setIsLoading(true);
      const newUser = await createUser(userData);
      setUsers((prev) => [...prev, newUser]);
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const editUser = async (id, userData) => {
    try {
      setIsLoading(true);
      const updatedUser = await updateUser(id, userData);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? updatedUser : user))
      );
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeUser = async (id) => {
    try {
      setIsLoading(true);
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    users,
    isLoading,
    error,
    getUserById,
    addUser,
    editUser,
    removeUser,
  };
}
