// src/config/constants.js
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://api.plume-royale.com/v1";

export const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
export const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
export const TOKEN_EXPIRATION = process.env.REACT_APP_TOKEN_EXPIRATION || 3600;

export const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const ANALYTICS = {
  GA_TRACKING_ID: process.env.REACT_APP_GA_TRACKING_ID,
  SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
};

export const APP_CONFIG = {
  ENV: process.env.REACT_APP_ENV || "development",
  VERSION: process.env.REACT_APP_VERSION || "1.0.0",
  WEB_URL: process.env.REACT_APP_WEB_URL,
  CDN_URL: process.env.REACT_APP_CDN_URL,
};

// Durées en millisecondes
export const TIMEOUTS = {
  API_REQUEST: 30000,
  DEBOUNCE: 500,
  TOAST: 5000,
};

// Rôles utilisateurs
export const USER_ROLES = {
  ADMIN: "admin",
  PARENT: "parent",
  CHILD: "child",
  TUTOR: "tutor",
};
