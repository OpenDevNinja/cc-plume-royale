// src/api/api.js - Configuration corrigée
import axios from "axios";
import { API_BASE_URL } from "../config/constants";

// Création de l'instance Axios avec la configuration de base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important pour les cookies
});

// Intercepteur de requête
api.interceptors.request.use(
  (config) => {
    // Récupérer le token du localStorage (pas accessToken mais token)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponse
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gestion globale des erreurs
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Token expiré ou invalide - nettoyer et rediriger
          localStorage.removeItem("token");
          // Si on a une fonction de déconnexion globale, l'appeler ici
          if (window.location.pathname !== "/auth/login") {
            window.location.href = "/auth/login";
          }
          break;
        case 403:
          // Accès refusé
          console.error("Accès refusé");
          break;
        case 404:
          // Ressource non trouvée
          console.error("Ressource non trouvée");
          break;
        case 500:
          // Erreur serveur
          console.error("Erreur serveur interne");
          break;
        default:
          break;
      }
    } else if (error.request) {
      // Erreur réseau
      console.error("Erreur réseau:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
