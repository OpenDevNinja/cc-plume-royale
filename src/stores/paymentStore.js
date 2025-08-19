// src/stores/paymentStore.js
import { create } from "zustand";

const usePaymentStore = create((set) => ({
  paymentMethods: [],
  selectedMethod: null,
  paymentIntent: null,
  invoices: [],

  setPaymentMethods: (methods) => set({ paymentMethods: methods }),

  selectPaymentMethod: (methodId) => set({ selectedMethod: methodId }),

  setPaymentIntent: (intent) => set({ paymentIntent: intent }),

  addInvoice: (invoice) =>
    set((state) => ({
      invoices: [...state.invoices, invoice],
    })),

  clearPaymentData: () =>
    set({
      paymentIntent: null,
      selectedMethod: null,
    }),
}));

export default usePaymentStore;
