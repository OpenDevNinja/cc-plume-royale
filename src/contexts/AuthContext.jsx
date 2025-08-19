//contexts/AuthContext.jsx 
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../config/routes";
import {
  login as authLogin,
  logout as authLogout,
  getCurrentUser,
  register as authRegister,
  forgotPassword as authForgotPassword,
  resetPassword as authResetPassword,
  verifyEmail as authVerifyEmail
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
          setUser(currentUser.data); // CORRECTION: Accéder à response.data
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
      const response = await authLogin(credentials);
      const { token, data: user } = response; // CORRECTION: Structure de réponse

      localStorage.setItem("token", token);
      setAuthToken(token);
      setUser(user);

      // Redirection basée sur le rôle
      if (user.role === "parent") navigate(ROUTES.PARENT_DASHBOARD);
      else if (user.role === "child") navigate(ROUTES.CHILD_DASHBOARD);
      else if (user.role === "admin") navigate(ROUTES.ADMIN_DASHBOARD);

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return { success: false, message: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authRegister(userData);
      return { success: true, data: response };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return { success: false, message: errorMessage };
    }
  };

  const forgotPassword = async (email) => {
    try {
      await authForgotPassword(email);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return { success: false, message: errorMessage };
    }
  };

  const resetPassword = async (data) => {
    try {
      await authResetPassword(data);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return { success: false, message: errorMessage };
    }
  };

  // CORRECTION: Fonction verify corrigée
  const verify = async (token) => {
    try {
      const response = await authVerifyEmail(token);
      return { success: true, data: response };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return { success: false, message: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    removeAuthToken();
    setUser(null);
    navigate(ROUTES.LOGIN);
    authLogout().catch(console.error); // Gérer l'erreur potentielle
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    forgotPassword,
    resetPassword,
    verify,
    logout
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
