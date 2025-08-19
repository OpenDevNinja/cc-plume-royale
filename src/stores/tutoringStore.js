// src/stores/tutoringStore.js
import { create } from "zustand";

const useTutoringStore = create((set) => ({
  availableTutors: [],
  upcomingSessions: [],
  selectedTutor: null,
  selectedSlot: null,

  setAvailableTutors: (tutors) => set({ availableTutors: tutors }),

  setUpcomingSessions: (sessions) => set({ upcomingSessions: sessions }),

  selectTutor: (tutor) => set({ selectedTutor: tutor }),

  selectTimeSlot: (slot) => set({ selectedSlot: slot }),

  addSession: (session) =>
    set((state) => ({
      upcomingSessions: [...state.upcomingSessions, session],
    })),

  cancelSession: (sessionId) =>
    set((state) => ({
      upcomingSessions: state.upcomingSessions.filter(
        (session) => session.id !== sessionId
      ),
    })),
}));

export default useTutoringStore;
