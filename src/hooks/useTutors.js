import { useState, useEffect } from "react";
import { getTutors, approveTutor, rejectTutor } from "../api/tutors";

export function useTutors() {
  const [tutors, setTutors] = useState([]);
  const [pendingTutors, setPendingTutors] = useState([]);
  const [approvedTutors, setApprovedTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setIsLoading(true);
        const data = await getTutors();
        setTutors(data);

        // Filtrer les tuteurs par statut
        setPendingTutors(data.filter((tutor) => !tutor.approved));
        setApprovedTutors(data.filter((tutor) => tutor.approved));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const handleApprove = async (tutorId) => {
    try {
      await approveTutor(tutorId);
      setTutors(
        tutors.map((tutor) =>
          tutor.id === tutorId ? { ...tutor, approved: true } : tutor
        )
      );
      setPendingTutors(pendingTutors.filter((t) => t.id !== tutorId));
      setApprovedTutors([
        ...approvedTutors,
        tutors.find((t) => t.id === tutorId),
      ]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReject = async (tutorId) => {
    try {
      await rejectTutor(tutorId);
      setTutors(tutors.filter((t) => t.id !== tutorId));
      setPendingTutors(pendingTutors.filter((t) => t.id !== tutorId));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    tutors,
    pendingTutors,
    approvedTutors,
    isLoading,
    error,
    approveTutor: handleApprove,
    rejectTutor: handleReject,
    refresh: () => {
      setTutors([]);
      setPendingTutors([]);
      setApprovedTutors([]);
      setIsLoading(true);
    },
  };
}
