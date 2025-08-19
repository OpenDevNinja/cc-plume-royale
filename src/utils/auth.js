// src/utils/auth.js
export const getAuthToken = () => {
  return localStorage.getItem("plumeRoyaleToken");
};

export const setAuthToken = (token) => {
  localStorage.setItem("plumeRoyaleToken", token);
};

export const removeAuthToken = () => {
  localStorage.removeItem("plumeRoyaleToken");
};

export const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const decoded = decodeJWT(token);
  if (!decoded?.exp) return true;
  return Date.now() >= decoded.exp * 1000;
};
