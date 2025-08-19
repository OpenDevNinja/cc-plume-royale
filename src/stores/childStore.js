// src/stores/childStore.js
import { create } from "zustand";

const useChildStore = create((set) => ({
  currentChild: null,
  children: [],
  setCurrentChild: (child) => set({ currentChild: child }),
  setChildren: (children) => set({ children }),
  addChild: (child) =>
    set((state) => ({ children: [...state.children, child] })),
  updateChild: (updatedChild) =>
    set((state) => ({
      children: state.children.map((child) =>
        child.id === updatedChild.id ? updatedChild : child
      ),
    })),
  removeChild: (childId) =>
    set((state) => ({
      children: state.children.filter((child) => child.id !== childId),
    })),
}));

export default useChildStore;
