// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../config/routes";
import {
  login as authLogin,
  logout as authLogout,
  getCurrentUser,
} from "../api/auth";
import { setAuthToken, removeAuthToken } from "../utils/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          setAuthToken(token);
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Failed to load user", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    try {
      const { token, user } = await authLogin(credentials);
      localStorage.setItem("token", token);
      setAuthToken(token);
      setUser(user);

      // Redirect based on role
      if (user.role === "parent") navigate(ROUTES.PARENT_DASHBOARD);
      else if (user.role === "child") navigate(ROUTES.CHILD_DASHBOARD);
      else if (user.role === "admin") navigate(ROUTES.ADMIN_DASHBOARD);

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    removeAuthToken();
    setUser(null);
    navigate(ROUTES.HOME);
    authLogout();
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
