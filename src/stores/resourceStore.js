// src/stores/resourceStore.js
import { create } from "zustand";

const useResourceStore = create((set) => ({
  resources: [],
  featuredResources: [],
  recentResources: [],
  currentResource: null,
  setResources: (resources) => set({ resources }),
  setFeaturedResources: (featured) => set({ featuredResources: featured }),
  setRecentResources: (recent) => set({ recentResources: recent }),
  setCurrentResource: (resource) => set({ currentResource: resource }),
  addResource: (resource) =>
    set((state) => ({
      resources: [resource, ...state.resources],
      recentResources: [resource, ...state.recentResources].slice(0, 5),
    })),
  updateResource: (id, updates) =>
    set((state) => ({
      resources: state.resources.map((res) =>
        res.id === id ? { ...res, ...updates } : res
      ),
      featuredResources: state.featuredResources.map((res) =>
        res.id === id ? { ...res, ...updates } : res
      ),
      recentResources: state.recentResources.map((res) =>
        res.id === id ? { ...res, ...updates } : res
      ),
      currentResource:
        state.currentResource?.id === id
          ? { ...state.currentResource, ...updates }
          : state.currentResource,
    })),
  removeResource: (id) =>
    set((state) => ({
      resources: state.resources.filter((res) => res.id !== id),
      featuredResources: state.featuredResources.filter((res) => res.id !== id),
      recentResources: state.recentResources.filter((res) => res.id !== id),
      currentResource:
        state.currentResource?.id === id ? null : state.currentResource,
    })),
}));

export default useResourceStore;
