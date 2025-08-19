// src/utils/notifications.js
import toast from "react-hot-toast";

export const showSuccessNotification = (message) => {
  toast.success(message, {
    position: "top-right",
    duration: 5000,
    style: {
      background: "#f0fdf4",
      color: "#166534",
      border: "1px solid #bbf7d0",
    },
  });
};

export const showErrorNotification = (message) => {
  toast.error(message, {
    position: "top-right",
    duration: 5000,
    style: {
      background: "#fef2f2",
      color: "#b91c1c",
      border: "1px solid #fecaca",
    },
  });
};

export const showPromiseNotification = (promise, messages) => {
  return toast.promise(promise, messages, {
    position: "top-right",
    style: {
      background: "#eff6ff",
      color: "#1e40af",
      border: "1px solid #bfdbfe",
    },
  });
};
