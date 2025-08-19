// src/stores/subscriptionStore.js
import { create } from "zustand";

const useSubscriptionStore = create((set) => ({
  currentSubscription: null,
  invoices: [],
  paymentMethods: [],
  setCurrentSubscription: (subscription) =>
    set({ currentSubscription: subscription }),
  setInvoices: (invoices) => set({ invoices }),
  setPaymentMethods: (methods) => set({ paymentMethods: methods }),
  addInvoice: (invoice) =>
    set((state) => ({ invoices: [...state.invoices, invoice] })),
  addPaymentMethod: (method) =>
    set((state) => ({ paymentMethods: [...state.paymentMethods, method] })),
  cancelSubscription: () => set({ currentSubscription: null }),
}));

export default useSubscriptionStore;
