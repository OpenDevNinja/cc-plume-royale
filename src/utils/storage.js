// src/utils/storage.js
export const getLocalStorage = (key, defaultValue = null) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
};

export const getSessionStorage = (key, defaultValue = null) => {
  try {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error(`Error reading sessionStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const setSessionStorage = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting sessionStorage key "${key}":`, error);
  }
};

export const removeSessionStorage = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing sessionStorage key "${key}":`, error);
  }
};
