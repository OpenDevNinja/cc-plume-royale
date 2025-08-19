// src/stores/uiStore.js
import { create } from "zustand";

const useUiStore = create((set) => ({
  // État du menu mobile
  mobileMenuOpen: false,
  toggleMobileMenu: () =>
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),

  // État des modales
  modal: null,
  openModal: (modalName, modalProps = {}) =>
    set({
      modal: { name: modalName, props: modalProps },
    }),
  closeModal: () => set({ modal: null }),

  // État des notifications
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  // Chargement global
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));

export default useUiStore;
