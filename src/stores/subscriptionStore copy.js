// src/stores/subscriptionStore.js
import { create } from "zustand";

const useSubscriptionStore = create((set) => ({
  currentPlan: null,
  availablePlans: [],
  paymentHistory: [],
  isLoading: false,

  setAvailablePlans: (plans) => set({ availablePlans: plans }),

  subscribe: async (planId) => {
    set({ isLoading: true });
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const selectedPlan = useSubscriptionStore
        .getState()
        .availablePlans.find((p) => p.id === planId);
      set({ currentPlan: selectedPlan });
      return selectedPlan;
    } finally {
      set({ isLoading: false });
    }
  },

  cancelSubscription: async () => {
    set({ isLoading: true });
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ currentPlan: null });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPaymentHistory: async (userId) => {
    set({ isLoading: true });
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockHistory = [
        {
          id: 1,
          amount: 12,
          date: "2023-06-15",
          status: "completed",
          invoiceUrl: "#",
        },
      ];
      set({ paymentHistory: mockHistory });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useSubscriptionStore;
