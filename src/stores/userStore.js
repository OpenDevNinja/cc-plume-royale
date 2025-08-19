// src/stores/userStore.js
import { create } from "zustand";

const useUserStore = create((set) => ({
  users: [],
  currentUser: null,
  isLoading: false,

  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockUsers = [
        {
          id: 1,
          name: "Jean Dupont",
          email: "jean@example.com",
          role: "parent",
          createdAt: "2023-01-15",
        },
        {
          id: 2,
          name: "Marie Martin",
          email: "marie@example.com",
          role: "child",
          createdAt: "2023-02-20",
        },
      ];
      set({ users: mockUsers });
    } finally {
      set({ isLoading: false });
    }
  },

  createUser: async (userData) => {
    set({ isLoading: true });
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newUser = {
        id: Math.floor(Math.random() * 1000),
        ...userData,
        createdAt: new Date().toISOString(),
      };
      set((state) => ({ users: [...state.users, newUser] }));
      return newUser;
    } finally {
      set({ isLoading: false });
    }
  },

  updateUser: async (userId, updates) => {
    set({ isLoading: true });
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 500));
      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? { ...user, ...updates } : user
        ),
      }));
    } finally {
      set({ isLoading: false });
    }
  },

  deleteUser: async (userId) => {
    set({ isLoading: true });
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 300));
      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
      }));
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
