// src/utils/http.js
import axios from "axios";
import { getAuthToken } from "./auth";

export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        // Gérer la déconnexion
      }
      return Promise.reject(error);
    }
  );
};

export const handleApiError = (error) => {
  if (error.response) {
    // Erreurs HTTP avec réponse
    const { status, data } = error.response;
    switch (status) {
      case 400:
        return data.message || "Requête invalide";
      case 401:
        return "Authentification requise";
      case 403:
        return "Accès refusé";
      case 404:
        return "Ressource non trouvée";
      case 500:
        return "Erreur interne du serveur";
      default:
        return `Erreur HTTP: ${status}`;
    }
  } else if (error.request) {
    // Requête faite mais pas de réponse
    return "Pas de réponse du serveur";
  } else {
    // Erreur lors de la configuration de la requête
    return error.message || "Erreur inconnue";
  }
};
