// src/contexts/UiContext.js
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const UiContext = createContext();

export function UiProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      document.documentElement.classList.toggle("dark", !prev);
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };

  const addNotification = (notification) => {
    setNotifications((prev) => [...prev, notification]);
    setTimeout(() => {
      removeNotification(notification.id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    // Initialize dark mode from localStorage
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.documentElement.classList.toggle("dark", savedMode);
  }, []);

  const value = {
    sidebarOpen,
    darkMode,
    notifications,
    toggleSidebar,
    toggleDarkMode,
    addNotification,
    removeNotification,
  };

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const context = useContext(UiContext);
  if (context === undefined) {
    throw new Error("useUi must be used within a UiProvider");
  }
  return context;
}
